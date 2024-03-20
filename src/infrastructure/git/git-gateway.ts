import { Process } from '../../vendor/process/process.js';

export class GitGateway {
  constructor(private readonly process: Process) {}

  clone = async (url: string, branch: string, destination: string) => {
    await this.process.exec('git', [
      'clone',
      '-b',
      branch,
      '--single-branch',
      url,
      destination,
    ]);
  };

  static build = () => new GitGateway(new Process());
}
