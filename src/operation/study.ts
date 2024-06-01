import type { Operation } from './operation.js';

export abstract class Study implements Operation {
  private readonly operations: readonly Operation[];

  constructor(...operations: readonly Operation[]) {
    this.operations = operations;
  }

  get steps() {
    return this.operations.flatMap((operation) => operation.steps);
  }
}
