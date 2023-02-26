import { Material } from '../../../../lab/cabinet/material/material.js';
import { Process } from '../../../../vendor/process/process.js';
import { Step } from '../../../experiment.js';

export class Build implements Step {
  constructor(
    private readonly material: Material,
    private readonly process: Process
  ) {}

  description() {
    return 'Build project';
  }

  action = async () => {
    await this.process.exec(
      'npm',
      ['run', 'build'],
      this.material.download.destination
    );
  };

  static from(material: Material) {
    return new Build(material, new Process());
  }
}
