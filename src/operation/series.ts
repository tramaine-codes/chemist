import { Operation } from './operation.js';
import { Step } from './step.js';

export class Series implements Operation {
  public readonly steps: readonly Step[];

  constructor(...steps: readonly Step[]) {
    this.steps = steps;
  }
}
