import type { Material } from '../../../lab/cabinet/material/material.js';
import { FileSystem } from '../../../vendor/file-system/file-system.js';
import type { Step } from '../../step.js';

export class Dispose implements Step {
  constructor(
    private readonly material: Material,
    private readonly fs: FileSystem
  ) {}

  description = () => {
    const { compression, download } = this.material;

    return `Delete ${this.fs.basename(
      download.destination
    )}/ and ${this.fs.basename(compression.destination)}/`;
  };

  action = async () => {
    const { compression, download } = this.material;

    await this.fs.rm(download.destination, compression.destination);
  };

  static from = (material: Material) =>
    new Dispose(material, FileSystem.build());
}
