import { Loader } from '../../vendor/loader/loader.js';
import { Is } from '../../vendor/type/is.js';
import type {
  ProjectConfig,
  RuntimeOptions,
} from '../models/project-config.js';

export class ConfigurationService {
  constructor(
    private readonly loader: Loader,
    private readonly is: Is
  ) {}

  loadConfig = async (): Promise<ProjectConfig> => {
    const config = await this.loader.load();

    if (this.is.nullOrUndefined(config)) {
      throw new Error('chemist configuration not found');
    }

    return {
      ...config,
      download: (config as Partial<ProjectConfig>).download ?? {
        destination: '.chemist',
      },
    };
  };

  mergeWithOptions = (
    config: ProjectConfig,
    options: RuntimeOptions = { branch: 'main' }
  ) => {
    return {
      ...config,
      git: {
        url: config.git.url,
        branch: options.branch,
      },
    };
  };

  static build = () => new ConfigurationService(new Loader(), new Is());
}
