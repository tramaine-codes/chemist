import { Material } from '../../../../lab/cabinet/material/material.js';
import { Process } from '../../../../adapter/process/process.js';
import { Step } from '../../../experiment.js';

export class InstallDeps implements Step {
  constructor(
    private readonly material: Material,
    private readonly process: Process
  ) {}

  description() {
    return 'Install dependencies';
  }

  action = async () => {
    await this.process.exec(
      'npm',
      ['install'],
      this.material.download.destination
    );
  };

  static from(material: Material) {
    return new InstallDeps(material, new Process());
  }
}
