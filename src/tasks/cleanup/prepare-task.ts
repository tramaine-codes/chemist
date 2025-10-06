import type { ProjectContext } from '../../core/models/project-context.js';
import type { CleanupService } from '../../services/cleanup-service.js';
import type { Task } from '../base.js';

export class PrepareTask implements Task {
  readonly description = 'Prepare download directory';

  constructor(
    private readonly context: ProjectContext,
    private readonly cleanup: CleanupService
  ) {}

  execute = async () => {
    await this.cleanup.createDirectory(this.context.download.destination);
  };
}
