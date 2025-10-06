import { Package } from '../../vendor/pkg/package.js';
import { Is } from '../../vendor/type/is.js';
import type { MergedConfig } from './project-config.js';

export class ProjectContext {
  private root!: string;

  constructor(
    private readonly config: MergedConfig,
    private readonly pkg: Package,
    private readonly is: Is
  ) {}

  get name() {
    return this.config.name;
  }

  get git() {
    return this.config.git;
  }

  get rootDir() {
    if (this.is.nullOrUndefined(this.root)) {
      this.root = this.pkg.rootDir();
    }

    return this.root;
  }

  get compression() {
    const { destination, include } = this.config.compression;

    return {
      destination: `${this.rootDir}/${destination}`,
      include,
    };
  }

  get download() {
    const { destination } = this.config.download;

    return {
      destination: `${this.rootDir}/${destination}`,
    };
  }

  static from = (config: MergedConfig) =>
    new ProjectContext(config, Package.build(), new Is());
}
