import type { Variables } from '../infrastructure/config/variables.js';
import type { OpName } from '../operation/catalog.js';
import { Runner } from '../vendor/runner/runner.js';
import { LabTech } from './lab-tech.js';

export class Chemist {
  constructor(
    private readonly runner: Runner,
    private readonly tech: LabTech
  ) {}

  run = async (opName: OpName, variables?: Variables) =>
    await this.runner.run(this.tech.prep(opName, variables));

  static build = () => new Chemist(new Runner(), LabTech.build());
}
