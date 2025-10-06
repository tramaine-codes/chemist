import { FileSystem } from '../vendor/file-system/file-system.js';

export class CleanupService {
  constructor(private readonly fs: FileSystem) {}

  remove = async (paths: ReadonlyArray<string>) => {
    await this.fs.rm(...paths);
  };

  createDirectory = async (path: string) => {
    await this.fs.mkdir(path);
  };

  static build = () => new CleanupService(FileSystem.build());
}
