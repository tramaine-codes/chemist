import { deleteAsync } from 'del';
import fs from 'fs';
import makeDir from 'make-dir';
import { basename } from 'path';

export class FileOperations {
  rm = async (patterns: readonly string[]) => await deleteAsync(patterns);

  mkdir = async (path: string) => await makeDir(path);

  writeStream = (path: string) => fs.createWriteStream(path);

  basename = (path: string) => basename(path);
}
