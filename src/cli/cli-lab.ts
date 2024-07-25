import type { Lab } from '../lab/lab.js';
import type { Process } from '../operation/process.js';
import { Runner } from '../vendor/runner/runner.js';

export class CliLab implements Lab {
  constructor(private readonly runner: Runner) {}

  run = async (operation: Process) => await this.runner.run(operation);

  static build = () => new CliLab(new Runner());
}
