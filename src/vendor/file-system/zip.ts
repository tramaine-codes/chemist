import archiver, { type Archiver } from 'archiver';
import type fs from 'node:fs';

export class Zip {
  zip = async (
    stream: fs.WriteStream,
    patterns: readonly string[],
    cwd: string
  ) => {
    const archive = archiver('zip');

    archive.pipe(stream);
    for (const pattern of patterns) {
      archive.glob(pattern, { cwd });
    }

    await this.finalize(archive, stream);
  };

  private finalize = async (archive: Archiver, stream: fs.WriteStream) => {
    const handler = new Promise<void>((resolve) => {
      stream.on('close', () => {
        resolve();
      });
    });

    await archive.finalize();
    await handler;
  };
}
