import type { ProjectContext } from '../../core/models/project-context.js';
import type { NpmService } from '../../services/npm-service.js';
import type { Task } from '../base.js';

export class InstallDepsTask implements Task {
  readonly description = 'Install dependencies';

  constructor(
    private readonly context: ProjectContext,
    private readonly npmService: NpmService
  ) {}

  execute = async () => {
    await this.npmService.installAll(this.context.download.destination);
  };
}
