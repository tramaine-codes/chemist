import { Listr } from 'listr2';
import type { Operation } from '../../operation/operation.js';
import type { Step } from '../../operation/step.js';

export class Runner {
  run = async ({ steps }: Operation) => {
    await this.list(steps).run();
  };

  private list = (steps: readonly Step[]) => new Listr(this.tasks(steps));

  private tasks = (steps: readonly Step[]) =>
    steps.map((step) => ({
      title: step.description(),
      task: step.action,
    }));
}
