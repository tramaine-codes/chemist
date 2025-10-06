import type { ProjectContext } from '../../core/models/project-context.js';
import type { NpmService } from '../../services/npm-service.js';
import type { Task } from '../base.js';

export class BuildTask implements Task {
  readonly description = 'Build project';

  constructor(
    private readonly context: ProjectContext,
    private readonly npmService: NpmService
  ) {}

  execute = async () => {
    await this.npmService.build(this.context.download.destination);
  };
}
