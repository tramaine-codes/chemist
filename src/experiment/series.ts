import { Experiment, Step } from './experiment.js';

export class Series implements Experiment {
  public readonly steps: readonly Step[];

  constructor(...steps: readonly Step[]) {
    this.steps = steps;
  }
}
