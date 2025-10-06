# Chemist

Chemist is a packager that bundles source code within a standard Node.js project into a compressed file.

![Build Status](https://github.com/tgillus/chemist/actions/workflows/main.yml/badge.svg)
[![GitHub version](https://img.shields.io/github/package-json/v/tgillus/chemist)](https://github.com/tgillus/chemist#readme)
[![NPM version](https://img.shields.io/npm/v/@triviumsoftware/chemist)](https://www.npmjs.com/package/@triviumsoftware/chemist)
[![License](https://img.shields.io/npm/l/@triviumsoftware/chemist)](https://github.com/tgillus/chemist/blob/main/LICENSE)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

## Prerequisites

Ensure the following requirements are met prior to usage:

- Node.js 18 or higher
- Git installed

## Installation

Via NPM:

```bash
npm install --save-dev @triviumsoftware/chemist
```

## Usage

### Configuration File

Chemist looks for a config file named `chemist.config.js` in the project's root directory. The following is an example with all of the configurable settings:

```javascript
export default {
  name: 'chemist',
  git: {
    url: 'git@github.com:tgillus/chemist.git',
  },
  compression: {
    destination: 'dist',
    include: ['lib/**/*', 'node_modules/**/*', 'package.json'],
  },
};
```

### Configuration Settings

| Setting                   | Description                                                                            |
| ------------------------- | -------------------------------------------------------------------------------------- |
| `name`                    | Name of the project. Used in the compressed file name                                  |
| `git.url`                 | Repo whose source code is cloned and compressed                                        |
| `compression.destination` | Directory where the compressed file is saved                                           |
| `compression.include`     | Directories/files included in the compressed file (NOTE: valid glob patterns required) |

### Commands

| Command            | Description                                               |
| ------------------ | --------------------------------------------------------- |
| `chemist`          | Bundle the project as a compressed file                   |
| `chemist synth`    | Bundle the project as a compressed file                   |
| `chemist download` | Clone project from Git (Does not create compressed file.) |
| `chemist dispose`  | Delete .chemist and `compression.destination` directories |

### Synthesis

Chemist expects an NPM script named `build` to be defined in `package.json`. In other words, Chemist executes the following command to build the project:

```bash
npm run build
```

Chemist installs an executable named `chemist`. Run the following in the root of the project to bundle it as a compressed file:

```bash
npx chemist
```

or

```bash
npx chemist synth
```

> NOTE: Chemist clones a fresh copy of the project's repository prior to building and bundling the project. It installs all of the project's dependencies after it's cloned in order to build the project. However, only production dependencies remain after the `synth` command completes.

### Download

Run the following in the root of the project to download the project from `git.url`.

```bash
npx chemist download --branch main
```

The `--branch` flag (aliased as `-b`) indicates the branch to checkout once the clone from Git is complete. If the branch argument is omitted Chemist defaults to the main branch.

### Disposal

Run the following in the root of the project to remove the .chemist and `compression.destination` directories:

```bash
npx chemist dispose
```

## Author

[Tramaine Gillus](https://tramaine.me)

## License

Chemist is distributed under the MIT License. See the LICENSE file for more information.
