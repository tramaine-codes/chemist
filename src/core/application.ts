import type { RuntimeOptions } from './models/project-config.js';
import { ProjectContext } from './models/project-context.js';
import { ConfigurationService } from './config/configuration-service.js';
import { ListrTaskRunner } from '../tasks/task-runner.js';
import { CleanupWorkflow } from './workflows/cleanup-workflow.js';
import { DownloadWorkflow } from './workflows/download-workflow.js';
import { PrepareWorkflow } from './workflows/prepare-workflow.js';
import { SynthesisWorkflow } from './workflows/synthesis-workflow.js';

export type WorkflowName = 'synth' | 'download' | 'dispose' | 'prepare';

export class Application {
  constructor(
    private readonly configService: ConfigurationService,
    private readonly taskRunner: ListrTaskRunner
  ) {}

  run = async (workflowName: WorkflowName, options?: RuntimeOptions) => {
    const config = await this.configService.loadConfig();
    const mergedConfig = this.configService.mergeWithOptions(config, options);
    const context = ProjectContext.from(mergedConfig);

    const workflow = this.getWorkflow(workflowName, context);
    await this.taskRunner.run(workflow.getTasks());
  };

  private getWorkflow = (
    workflowName: WorkflowName,
    context: ProjectContext
  ) => {
    switch (workflowName) {
      case 'synth':
        return SynthesisWorkflow.from(context);
      case 'download':
        return DownloadWorkflow.from(context);
      case 'dispose':
        return CleanupWorkflow.from(context);
      case 'prepare':
        return PrepareWorkflow.from(context);
    }
  };

  static build = () =>
    new Application(ConfigurationService.build(), new ListrTaskRunner());
}
