import { Listr } from 'listr2';
import type { Task } from './base.js';

export class ListrTaskRunner {
  run = async (tasks: ReadonlyArray<Task>) => {
    const listr = new Listr(
      tasks.map((task) => ({
        title: task.description,
        task: task.execute,
      }))
    );

    await listr.run();
  };
}
