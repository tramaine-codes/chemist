import { Listr } from 'listr2';
import { Experiment, Step } from '../../experiment/experiment.js';

export class Runner {
  async run({ steps }: Experiment) {
    await this.list(steps).run();
  }

  private list(steps: readonly Step[]) {
    return new Listr(this.tasks(steps));
  }

  private tasks(steps: readonly Step[]) {
    return steps.map((step) => ({
      title: step.description(),
      task: step.action,
    }));
  }
}
