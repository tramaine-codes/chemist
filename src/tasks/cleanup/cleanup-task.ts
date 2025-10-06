import type { ProjectContext } from '../../core/models/project-context.js';
import type { CleanupService } from '../../services/cleanup-service.js';
import type { Task } from '../base.js';

export class CleanupTask implements Task {
  readonly description = 'Dispose of synthesized products';

  constructor(
    private readonly context: ProjectContext,
    private readonly cleanup: CleanupService
  ) {}

  execute = async () => {
    const paths = [
      this.context.download.destination,
      this.context.compression.destination,
    ];

    await this.cleanup.remove(paths);
  };
}
