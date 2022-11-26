import { Operations } from './operations.js';
import { Zip } from './zip.js';

export class FileSystem {
  constructor(
    private readonly operations: Operations,
    private readonly compressor: Zip
  ) {}

  async rm(...patterns: readonly string[]) {
    await this.operations.rm(patterns);
  }

  async mkdir(path: string) {
    await this.operations.mkdir(path);
  }

  async zip(destination: string, patterns: readonly string[], cwd: string) {
    await this.compressor.zip(
      this.operations.writeStream(destination),
      patterns,
      cwd
    );
  }

  basename(path: string) {
    return this.operations.basename(path);
  }

  static build() {
    return new FileSystem(new Operations(), new Zip());
  }
}
