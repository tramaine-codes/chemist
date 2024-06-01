import type { Lab } from '../lab/lab.js';
import type { Operation } from '../operation/operation.js';
import { Runner } from '../vendor/runner/runner.js';

export class CliLab implements Lab {
  constructor(private readonly runner: Runner) {}

  run = async (operation: Operation) => await this.runner.run(operation);

  static build = () => new CliLab(new Runner());
}
