import { Experiment } from '../experiment/experiment.js';
import { Lab } from '../lab/lab.js';
import { Runner } from '../vendor/runner/runner.js';

export class CliLab implements Lab {
  constructor(private readonly runner: Runner) {}

  async run(experiment: Experiment) {
    await this.runner.run(experiment);
  }

  static build() {
    return new CliLab(new Runner());
  }
}
