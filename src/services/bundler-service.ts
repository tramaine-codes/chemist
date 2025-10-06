import { FileSystem } from '../vendor/file-system/file-system.js';

export class BundlerService {
  constructor(private readonly fs: FileSystem) {}

  compress = async (
    outputPath: string,
    includes: ReadonlyArray<string>,
    cwd: string
  ) => {
    await this.fs.zip(outputPath, includes, cwd);
  };

  static build = () => new BundlerService(FileSystem.build());
}
