import { FileOperations } from './file-operations.js';
import { Zip } from './zip.js';

export class FileSystem {
  constructor(
    private readonly operations: FileOperations,
    private readonly compressor: Zip
  ) {}

  rm = async (...patterns: readonly string[]) => {
    await this.operations.rm(patterns);
  };

  mkdir = async (path: string) => {
    this.operations.mkdir(path);
  };

  zip = async (
    destination: string,
    patterns: readonly string[],
    cwd: string
  ) => {
    await this.compressor.zip(
      this.operations.writeStream(destination),
      patterns,
      cwd
    );
  };

  basename = (path: string) => this.operations.basename(path);

  static build = () => new FileSystem(new FileOperations(), new Zip());
}
