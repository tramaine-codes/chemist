import { Material } from '../../../lab/cabinet/material/material.js';
import { FileSystem } from '../../../vendor/file-system/file-system.js';
import { Step } from '../../experiment.js';

export class Dispose implements Step {
  constructor(
    private readonly material: Material,
    private readonly fs: FileSystem
  ) {}

  description() {
    const { compression, download } = this.material;

    return `Delete ${this.fs.basename(
      download.destination
    )}/ and ${this.fs.basename(compression.destination)}/`;
  }

  action = async () => {
    const { compression, download } = this.material;

    await this.fs.rm(download.destination, compression.destination);
  };

  static from(material: Material) {
    return new Dispose(material, FileSystem.build());
  }
}
