# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Chemist is a packager that bundles source code within a standard Node.js project into a compressed file. It clones a fresh copy of the project from Git, builds it, installs production dependencies, and creates a compressed archive.

## Prerequisites

- **Node.js:** Version 20 or higher (specified in `package.json` engines field)
- **NVM:** The project includes an `.nvmrc` file set to Node 20. Run `nvm use` to automatically switch to the correct version.

## Development Commands

### Build & Test

```bash
npm run build          # Full build: clean → barrels → test → compile TypeScript
npm run build:ci       # CI build: clean → test → compile (no barrel generation)
npm test              # Run all tests
npm run test:watch    # Run tests in watch mode
npm run test:cov      # Run tests with coverage report
npm run typecheck     # Type check without emitting files
```

### Code Quality

```bash
npm run lint          # Lint with ESLint
npm run lint:fix      # Lint and auto-fix issues
npm run format        # Format code with Prettier
```

### Other Commands

```bash
npm run barrels       # Generate barrel exports (auto-runs during build)
npm run clean         # Remove lib/ and coverage/ directories
npm run release       # Create a release (CI mode)
```

## Architecture

The codebase uses a **layered architecture** with clear separation of concerns:

### 1. Core Layer (`src/core/`)

Application orchestration and domain logic.

- **`Application`** (`src/core/application.ts`): Main entry point. Coordinates configuration loading, workflow selection, and task execution.
- **`ConfigurationService`** (`src/core/config/configuration-service.ts`): Loads and merges configuration from `chemist.config.cjs` with runtime options.
- **Models** (`src/core/models/`):
  - `ProjectContext`: Domain model representing the project's configuration and computed paths
  - `ProjectConfig`: Configuration loaded from file
  - `RuntimeOptions`: CLI-provided options (branch selection)
  - `MergedConfig`: Combined configuration and runtime options
- **Workflows** (`src/core/workflows/`):
  - `SynthesisWorkflow`: Full build workflow (cleanup → prepare → clone → install → build → install prod → compress)
  - `DownloadWorkflow`: Clone repository to `.chemist` directory
  - `CleanupWorkflow`: Remove `.chemist` and destination directories
  - `PrepareWorkflow`: Cleanup + recreate `.chemist` directory

### 2. Services Layer (`src/services/`)

Business logic services that encapsulate operations.

- **`GitService`**: Git operations (clone)
- **`NpmService`**: NPM operations (install all/production deps, build)
- **`BundlerService`**: Compression/archiving operations
- **`CleanupService`**: File system cleanup and directory creation

### 3. Tasks Layer (`src/tasks/`)

Concrete task implementations representing atomic operations.

- **`Task`** (`src/tasks/base.ts`): Interface for executable tasks with description
- **`ListrTaskRunner`** (`src/tasks/task-runner.ts`): Executes tasks using Listr2 for progress display
- **Git Tasks** (`src/tasks/git/`): `CloneTask`
- **NPM Tasks** (`src/tasks/npm/`): `BuildTask`, `InstallDepsTask`, `InstallProdDepsTask`
- **Compression Tasks** (`src/tasks/compression/`): `CompressTask`
- **Cleanup Tasks** (`src/tasks/cleanup/`): `CleanupTask`, `PrepareTask`

### 4. Infrastructure Layer (`src/infrastructure/`)

External system integrations and gateways.

- **`GitGateway`** (`src/infrastructure/git/git-gateway.ts`): Git clone operations via execa
- **`NpmGateway`** (`src/infrastructure/npm/npm-gateway.ts`): NPM install and build operations via execa

### 5. Vendor Layer (`src/vendor/`)

Abstractions over third-party libraries. Provides clean interfaces for:

- File system operations (del, make-dir, archiver)
- Process execution (execa)
- Type utilities (sindresorhus/is)
- Text formatting (chalk, boxen)
- Package utilities (read-package-up)

### Architecture Flow

```
CLI (src/cli/program.ts)
  ↓
Application (src/core/application.ts)
  ↓
ConfigurationService → ProjectContext
  ↓
Workflow Selection (Synthesis/Download/Cleanup/Prepare)
  ↓
Task List Generation
  ↓
ListrTaskRunner → Execute Tasks
  ↓
Tasks → Services → Infrastructure/Vendor
```

## Configuration

Chemist expects a configuration file named `chemist.config.js` in the project root using ES module syntax.

**Required Fields:**

- `name`: Project name (used in compressed filename)
- `git.url`: Git repository URL to clone
- `compression.destination`: Output directory for compressed file
- `compression.include`: Array of glob patterns for files to include

**Optional Fields:**

- `download.destination`: Clone destination (defaults to `.chemist`)

**Example:**

```javascript
export default {
  name: 'chemist',
  git: {
    url: 'git@github.com:tramaine-codes/chemist.git',
  },
  compression: {
    destination: 'dist',
    include: ['lib/**/*', 'node_modules/**/*', 'package.json'],
  },
};
```

## TypeScript Configuration

- **Module System:** ES Modules (`"type": "module"` in package.json)
- **Module Resolution:** Node16 (requires `.js` extensions in imports)
- **Target:** ES2020
- **Strict Mode:** Enabled with enhanced checks (`noUncheckedIndexedAccess`, `noPropertyAccessFromIndexSignature`)
- **Output:** `lib/` directory (excluded from git)
- **Source:** `src/` directory

## Barrel Exports

The project uses barrelsby to auto-generate barrel exports in `src/index.ts`. A custom script adds `.js` extensions to imports (required for Node16 module resolution).

**Process:**

1. `barrelsby -c barrelsby.json` generates exports
2. `npm run format` formats the output
3. `replace-in-files` adds `.js` extensions to import paths

**Note:** Barrel generation runs during `npm run build` but NOT during `npm run build:ci`.

## Testing

- **Framework:** Vitest
- **Test Files:** Located in `test/` directory, mirroring `src/` structure
- **Mocking:** Uses testdouble library
- **Coverage:**
  - Includes: `src/**/*.ts`
  - Excludes: `src/index.ts`, `src/cli/cli.ts`, most `src/vendor/**` files (except `src/vendor/file-system.ts`)

**Running a Single Test:**

```bash
npx vitest run test/path/to/file.test.ts
```

## CLI Commands

The `chemist` CLI (defined in `src/cli/program.ts`) provides:

```bash
chemist [synth]              # Default: bundle project (requires -b flag)
chemist synth -b main        # Synthesize from specific branch
chemist download -b main     # Clone project from git
chemist prepare              # Clean and recreate .chemist directory
chemist dispose              # Remove .chemist and destination directories
```

## Testing the Project

### Manual Testing with the CLI

After building the project, you can test the CLI and config loading:

```bash
# Run directly using Node
node lib/cli/cli.js --help

# Test config loading with prepare command
node lib/cli/cli.js prepare

# Test cleanup command
node lib/cli/cli.js dispose

# Install globally for testing
npm link
chemist --help
chemist prepare
```

**Note:** The `prepare` and `dispose` commands are useful for testing config loading without requiring git credentials or performing a full build.

## Key Patterns

1. **Dependency Injection:** Classes use constructor injection with static factory methods (`.build()`)
2. **Layered Architecture:** Clear separation between core, services, tasks, infrastructure, and vendor layers
3. **Workflow Pattern:** Workflows compose tasks; tasks execute via services
4. **Immutability:** Configuration objects are readonly; use `ReadonlyArray<T>` for array types
5. **Single Responsibility:** Each task represents one atomic operation; services encapsulate related operations
