import { Listr } from 'listr2';
import type { Process } from '../../operation/process.js';
import type { Step } from '../../operation/step.js';

export class Runner {
  run = async ({ steps }: Process) => {
    await this.list(steps).run();
  };

  private list = (steps: readonly Step[]) => new Listr(this.tasks(steps));

  private tasks = (steps: readonly Step[]) =>
    steps.map((step) => ({
      title: step.description(),
      task: step.action,
    }));
}
