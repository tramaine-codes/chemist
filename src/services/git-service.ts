import { GitGateway } from '../infrastructure/git/git-gateway.js';

export class GitService {
  constructor(private readonly gateway: GitGateway) {}

  clone = async (url: string, destination: string, branch: string) => {
    await this.gateway.clone(url, destination, branch);
  };

  static build = () => new GitService(GitGateway.build());
}
