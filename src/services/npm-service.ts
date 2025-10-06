import { NpmGateway } from '../infrastructure/npm/npm-gateway.js';

export class NpmService {
  constructor(private readonly gateway: NpmGateway) {}

  installAll = async (cwd: string) => {
    await this.gateway.installDeps(cwd);
  };

  installProduction = async (cwd: string) => {
    await this.gateway.installProdDeps(cwd);
  };

  build = async (cwd: string) => {
    await this.gateway.build(cwd);
  };

  static build = () => new NpmService(NpmGateway.build());
}
