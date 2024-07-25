import type { Process } from './process.js';

export abstract class Operation implements Process {
  private readonly processes: readonly Process[];

  constructor(...processes: readonly Process[]) {
    this.processes = processes;
  }

  get steps() {
    return this.processes.flatMap((process) => process.steps);
  }
}
