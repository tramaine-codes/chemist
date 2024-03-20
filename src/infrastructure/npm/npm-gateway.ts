import { Process } from '../../vendor/process/process.js';

export class NpmGateway {
  constructor(private readonly process: Process) {}

  build = async (directory: string) => {
    await this.process.exec('npm', ['run', 'build'], directory);
  };

  installDeps = async (directory: string) => {
    await this.process.exec('npm', ['install'], directory);
  };

  installProdDeps = async (directory: string) => {
    await this.process.exec('npm', ['install', '--omit=dev'], directory);
  };

  static build = () => new NpmGateway(new Process());
}
