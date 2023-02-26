import archiver, { Archiver } from 'archiver';
import fs from 'fs';

export class Zip {
  async zip(stream: fs.WriteStream, patterns: readonly string[], cwd: string) {
    const archive = archiver('zip');

    archive.pipe(stream);
    patterns.forEach((pattern) => archive.glob(pattern, { cwd }));

    await this.finalize(archive, stream);
  }

  private async finalize(archive: Archiver, stream: fs.WriteStream) {
    const handler = new Promise<void>((resolve) => {
      stream.on('close', () => {
        resolve();
      });
    });

    await archive.finalize();
    await handler;
  }
}
