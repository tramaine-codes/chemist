import { cosmiconfig } from 'cosmiconfig';
import type { ProjectConfig } from '../../core/models/project-config.js';

export class Loader {
  load = async (): Promise<Omit<ProjectConfig, 'download'> | undefined> => {
    const result = await cosmiconfig('chemist').search();
    return result?.config;
  };
}
