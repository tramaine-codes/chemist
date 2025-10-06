import type { ProjectContext } from '../models/project-context.js';
import { CleanupService } from '../../services/cleanup-service.js';
import { CleanupTask } from '../../tasks/cleanup/cleanup-task.js';

export class CleanupWorkflow {
  constructor(
    private readonly context: ProjectContext,
    private readonly cleanup: CleanupService
  ) {}

  getTasks = () => {
    return [new CleanupTask(this.context, this.cleanup)];
  };

  static from = (context: ProjectContext) =>
    new CleanupWorkflow(context, CleanupService.build());
}
