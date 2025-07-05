import { fileURLToPath } from 'node:url';
import { packageDirectorySync } from 'package-directory';
import { readPackageUp, readPackageUpSync } from 'read-package-up';
import { Assert } from '../type/assert.js';

export class Package {
  constructor(private readonly assert: Assert) {}

  rootDir = () => {
    const pkgDir = packageDirectorySync();

    this.assert.string(pkgDir);

    return pkgDir;
  };

  packageVersion = async (cwd: string) => {
    const version = (
      await readPackageUp({
        cwd,
      })
    )?.packageJson.version;

    this.assert.string(version);

    return version;
  };

  packageVersionSync = () => {
    const version = readPackageUpSync({
      cwd: this.dirName(),
    })?.packageJson.version;

    this.assert.string(version);

    return version;
  };

  private dirName = () => fileURLToPath(new URL('.', import.meta.url));

  static build = () => new Package(new Assert());
}
