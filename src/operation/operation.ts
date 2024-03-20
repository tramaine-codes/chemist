import { Step } from './step.js';

export interface Operation {
  readonly steps: readonly Step[];
}
