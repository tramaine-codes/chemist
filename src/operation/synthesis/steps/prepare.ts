import { Material } from '../../../lab/cabinet/material/material.js';
import { FileSystem } from '../../../vendor/file-system/file-system.js';
import { Step } from '../../step.js';

export class Prepare implements Step {
  constructor(
    private readonly material: Material,
    private readonly fs: FileSystem
  ) {}

  description() {
    const {
      compression: { destination },
    } = this.material;

    return `Create ${this.fs.basename(destination)}/`;
  }

  action = async () => {
    const {
      compression: { destination },
    } = this.material;

    this.fs.mkdir(destination);
  };

  static from = (material: Material) =>
    new Prepare(material, FileSystem.build());
}
