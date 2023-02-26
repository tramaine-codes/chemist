import { Material } from '../../../lab/cabinet/material/material.js';
import { FileSystem } from '../../../vendor/file-system/file-system.js';
import { Package } from '../../../vendor/pkg/package.js';
import { Step } from '../../experiment.js';

export class Compress implements Step {
  constructor(
    private readonly material: Material,
    private readonly fs: FileSystem,
    private readonly pkg: Package
  ) {}

  description() {
    const {
      compression: { destination },
    } = this.material;

    return `Construct artifact in ${this.fs.basename(destination)}/`;
  }

  action = async () => {
    const {
      compression: { include },
      download: { destination: cwd },
    } = this.material;

    await this.fs.zip(await this.artifact(), include, cwd);
  };

  private artifact = async () => {
    const {
      name,
      compression: { destination },
    } = this.material;

    return `${destination}/${name}-${await this.version()}.zip`;
  };

  private version = async () => {
    return await this.pkg.packageVersion(this.material.download.destination);
  };

  static from(material: Material) {
    return new Compress(material, FileSystem.build(), Package.build());
  }
}
