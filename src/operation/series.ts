import type { Operation } from './operation.js';
import type { Step } from './step.js';

export class Series implements Operation {
  public readonly steps: readonly Step[];

  constructor(...steps: readonly Step[]) {
    this.steps = steps;
  }
}
