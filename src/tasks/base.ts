export interface Task {
  readonly description: string;
  execute(): Promise<void>;
}

export class TaskRunner {
  run = async (tasks: ReadonlyArray<Task>) => {
    for (const task of tasks) {
      await task.execute();
    }
  };
}
