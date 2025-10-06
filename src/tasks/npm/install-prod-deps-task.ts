import type { ProjectContext } from '../../core/models/project-context.js';
import type { NpmService } from '../../services/npm-service.js';
import type { Task } from '../base.js';

export class InstallProdDepsTask implements Task {
  readonly description = 'Install production dependencies';

  constructor(
    private readonly context: ProjectContext,
    private readonly npmService: NpmService
  ) {}

  execute = async () => {
    await this.npmService.installProduction(this.context.download.destination);
  };
}
