import { GitGateway } from '../../../../infrastructure/git/git-gateway.js';
import { Material } from '../../../../lab/cabinet/material/material.js';
import { Step } from '../../../step.js';

export class Clone implements Step {
  constructor(
    private readonly material: Material,
    private readonly gitGateway: GitGateway
  ) {}

  description = () => {
    const { url, branch } = this.material.git;

    return `Clone from ${url} and check out ${branch} branch`;
  };

  action = async () => {
    const {
      git: { url, branch },
      download: { destination },
    } = this.material;

    await this.gitGateway.clone(url, branch, destination);
  };

  static from = (material: Material) => new Clone(material, GitGateway.build());
}
