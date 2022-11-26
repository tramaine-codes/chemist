import { Package } from '../../../adapter/pkg/package.js';
import { Is } from '../../../adapter/type/is.js';
import { Compound } from './compound.js';

export class Material {
  private root!: string;

  constructor(
    private readonly compound: Compound,
    private readonly pkg: Package,
    private readonly is: Is
  ) {}

  get name() {
    return this.compound.name;
  }

  get git() {
    return this.compound.git;
  }

  get rootDir() {
    if (this.is.nullOrUndefined(this.root)) {
      this.root = this.pkg.rootDir();
    }

    return this.root;
  }

  get compression() {
    const { destination, include } = this.compound.compression;

    return {
      destination: `${this.rootDir}/${destination}`,
      include,
    };
  }

  get download() {
    const { destination } = this.compound.download;

    return {
      destination: `${this.rootDir}/${destination}`,
    };
  }

  static from(compounds: Compound) {
    return new Material(compounds, Package.build(), new Is());
  }
}
