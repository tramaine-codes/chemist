import { execa } from 'execa';

export class Process {
  exec = async (file: string, args?: ReadonlyArray<string>, cwd?: string) => {
    await execa(file, args, { cwd });
  };
}
