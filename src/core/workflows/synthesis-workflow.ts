import { BundlerService } from '../../services/bundler-service.js';
import { CleanupService } from '../../services/cleanup-service.js';
import { GitService } from '../../services/git-service.js';
import { NpmService } from '../../services/npm-service.js';
import { CleanupTask } from '../../tasks/cleanup/cleanup-task.js';
import { PrepareTask } from '../../tasks/cleanup/prepare-task.js';
import { CompressTask } from '../../tasks/compression/compress-task.js';
import { CloneTask } from '../../tasks/git/clone-task.js';
import { BuildTask } from '../../tasks/npm/build-task.js';
import { InstallDepsTask } from '../../tasks/npm/install-deps-task.js';
import { InstallProdDepsTask } from '../../tasks/npm/install-prod-deps-task.js';
import type { ProjectContext } from '../models/project-context.js';

export class SynthesisWorkflow {
  constructor(
    private readonly context: ProjectContext,
    private readonly gitService: GitService,
    private readonly npmService: NpmService,
    private readonly bundler: BundlerService,
    private readonly cleanup: CleanupService
  ) {}

  getTasks = () => {
    return [
      new CleanupTask(this.context, this.cleanup),
      new PrepareTask(this.context, this.cleanup),
      new CloneTask(this.context, this.gitService),
      new InstallDepsTask(this.context, this.npmService),
      new BuildTask(this.context, this.npmService),
      new InstallProdDepsTask(this.context, this.npmService),
      CompressTask.from(this.context, this.bundler),
    ];
  };

  static from = (context: ProjectContext) =>
    new SynthesisWorkflow(
      context,
      GitService.build(),
      NpmService.build(),
      BundlerService.build(),
      CleanupService.build()
    );
}
