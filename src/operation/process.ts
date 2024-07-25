import type { Step } from './step.js';

export interface Process {
  readonly steps: readonly Step[];
}
