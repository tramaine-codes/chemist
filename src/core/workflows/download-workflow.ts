import type { ProjectContext } from '../models/project-context.js';
import { CleanupService } from '../../services/cleanup-service.js';
import { GitService } from '../../services/git-service.js';
import { CleanupTask } from '../../tasks/cleanup/cleanup-task.js';
import { CloneTask } from '../../tasks/git/clone-task.js';
import { PrepareTask } from '../../tasks/cleanup/prepare-task.js';

export class DownloadWorkflow {
  constructor(
    private readonly context: ProjectContext,
    private readonly gitService: GitService,
    private readonly cleanup: CleanupService
  ) {}

  getTasks = () => {
    return [
      new CleanupTask(this.context, this.cleanup),
      new PrepareTask(this.context, this.cleanup),
      new CloneTask(this.context, this.gitService),
    ];
  };

  static from = (context: ProjectContext) =>
    new DownloadWorkflow(context, GitService.build(), CleanupService.build());
}
