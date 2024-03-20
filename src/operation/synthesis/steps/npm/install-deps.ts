import { NpmGateway } from '../../../../infrastructure/npm/npm-gateway.js';
import { Material } from '../../../../lab/cabinet/material/material.js';
import { Step } from '../../../step.js';

export class InstallDeps implements Step {
  constructor(
    private readonly material: Material,
    private readonly npmGateway: NpmGateway
  ) {}

  description = () => 'Install dependencies';

  action = async () =>
    await this.npmGateway.installDeps(this.material.download.destination);

  static from = (material: Material) =>
    new InstallDeps(material, NpmGateway.build());
}
