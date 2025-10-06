import type { ProjectContext } from '../models/project-context.js';
import { CleanupService } from '../../services/cleanup-service.js';
import { CleanupTask } from '../../tasks/cleanup/cleanup-task.js';
import { PrepareTask } from '../../tasks/cleanup/prepare-task.js';

export class PrepareWorkflow {
  constructor(
    private readonly context: ProjectContext,
    private readonly cleanup: CleanupService
  ) {}

  getTasks = () => {
    return [
      new CleanupTask(this.context, this.cleanup),
      new PrepareTask(this.context, this.cleanup),
    ];
  };

  static from = (context: ProjectContext) =>
    new PrepareWorkflow(context, CleanupService.build());
}
