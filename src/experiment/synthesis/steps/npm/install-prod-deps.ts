import { Material } from '../../../../lab/cabinet/material/material.js';
import { Process } from '../../../../vendor/process/process.js';
import { Step } from '../../../experiment.js';

export class InstallProdDeps implements Step {
  constructor(
    private readonly material: Material,
    private readonly process: Process
  ) {}

  description() {
    return 'Install production dependencies';
  }

  action = async () => {
    await this.process.exec(
      'npm',
      ['install', '--omit=dev'],
      this.material.download.destination
    );
  };

  static from(material: Material) {
    return new InstallProdDeps(material, new Process());
  }
}
