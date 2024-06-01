import { NpmGateway } from '../../../../infrastructure/npm/npm-gateway.js';
import type { Material } from '../../../../lab/cabinet/material/material.js';
import type { Step } from '../../../step.js';

export class InstallProdDeps implements Step {
  constructor(
    private readonly material: Material,
    private readonly npmGateway: NpmGateway
  ) {}

  description = () => 'Install production dependencies';

  action = async () =>
    await this.npmGateway.installProdDeps(this.material.download.destination);

  static from = (material: Material) =>
    new InstallProdDeps(material, NpmGateway.build());
}
