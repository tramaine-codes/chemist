import type { ProjectContext } from '../../core/models/project-context.js';
import type { BundlerService } from '../../services/bundler-service.js';
import { FileSystem } from '../../vendor/file-system/file-system.js';
import { Package } from '../../vendor/pkg/package.js';
import type { Task } from '../base.js';

export class CompressTask implements Task {
  constructor(
    private readonly context: ProjectContext,
    private readonly bundler: BundlerService,
    private readonly fs: FileSystem,
    private readonly pkg: Package
  ) {}

  get description() {
    const {
      compression: { destination },
    } = this.context;

    return `Construct artifact in ${this.fs.basename(destination)}/`;
  }

  execute = async () => {
    const {
      compression: { include },
      download: { destination: cwd },
    } = this.context;

    await this.bundler.compress(await this.artifact(), include, cwd);
  };

  private artifact = async () => {
    const {
      name,
      compression: { destination },
    } = this.context;

    return `${destination}/${name}-${await this.version()}.zip`;
  };

  private version = async () =>
    await this.pkg.packageVersion(this.context.download.destination);

  static from = (context: ProjectContext, bundler: BundlerService) =>
    new CompressTask(context, bundler, FileSystem.build(), Package.build());
}
