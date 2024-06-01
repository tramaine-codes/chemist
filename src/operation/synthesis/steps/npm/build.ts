import { NpmGateway } from '../../../../infrastructure/npm/npm-gateway.js';
import type { Material } from '../../../../lab/cabinet/material/material.js';
import type { Step } from '../../../step.js';

export class Build implements Step {
  constructor(
    private readonly material: Material,
    private readonly npmGateway: NpmGateway
  ) {}

  description = () => 'Build project';

  action = async () =>
    await this.npmGateway.build(this.material.download.destination);

  static from = (material: Material) => new Build(material, NpmGateway.build());
}
