import { packageDirectorySync } from 'pkg-dir';
import { readPackageUp, readPackageUpSync } from 'read-pkg-up';
import { Assert } from '../type/assert.js';
import { fileURLToPath } from 'url';

export class Package {
  constructor(private readonly assert: Assert) {}

  rootDir() {
    const pkgDir = packageDirectorySync();

    this.assert.string(pkgDir);

    return pkgDir;
  }

  async packageVersion(cwd: string) {
    const version = (
      await readPackageUp({
        cwd,
      })
    )?.packageJson.version;

    this.assert.string(version);

    return version;
  }

  packageVersionSync() {
    const version = readPackageUpSync({
      cwd: this.dirName(),
    })?.packageJson.version;

    this.assert.string(version);

    return version;
  }

  private dirName() {
    return fileURLToPath(new URL('.', import.meta.url));
  }

  static build() {
    return new Package(new Assert());
  }
}
