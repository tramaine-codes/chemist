import type { Process } from './process.js';
import type { Step } from './step.js';

export class Series implements Process {
  public readonly steps: readonly Step[];

  constructor(...steps: readonly Step[]) {
    this.steps = steps;
  }
}
