import { Experiment } from './experiment.js';

export abstract class Study implements Experiment {
  private readonly experiments: readonly Experiment[];

  constructor(...experiments: readonly Experiment[]) {
    this.experiments = experiments;
  }

  get steps() {
    return this.experiments.flatMap((experiment) => experiment.steps);
  }
}
