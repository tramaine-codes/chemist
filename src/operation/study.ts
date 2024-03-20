import { Operation } from './operation.js';

export abstract class Study implements Operation {
  private readonly experiments: readonly Operation[];

  constructor(...experiments: readonly Operation[]) {
    this.experiments = experiments;
  }

  get steps() {
    return this.experiments.flatMap((experiment) => experiment.steps);
  }
}
