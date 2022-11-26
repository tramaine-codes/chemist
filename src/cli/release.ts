import { Package } from '../adapter/pkg/package.js';

export class Release {
  constructor(private readonly pkg: Package) {}

  get name() {
    return 'Chemist';
  }

  get version() {
    return this.pkg.packageVersionSync();
  }

  static build() {
    return new Release(Package.build());
  }
}
