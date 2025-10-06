import type { ProjectContext } from '../../core/models/project-context.js';
import type { GitService } from '../../services/git-service.js';
import type { Task } from '../base.js';

export class CloneTask implements Task {
  readonly description: string;

  constructor(
    private readonly context: ProjectContext,
    private readonly gitService: GitService
  ) {
    this.description = `Clone ${this.context.git.url}`;
  }

  execute = async () => {
    const { url, branch } = this.context.git;
    const { destination } = this.context.download;

    await this.gitService.clone(url, destination, branch);
  };
}
