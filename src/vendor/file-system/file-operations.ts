import { deleteAsync } from 'del';
import { makeDirectory } from 'make-dir';
import fs from 'node:fs';
import { basename } from 'node:path';

export class FileOperations {
  rm = async (patterns: readonly string[]) => await deleteAsync(patterns);

  mkdir = async (path: string) => await makeDirectory(path);

  writeStream = (path: string) => fs.createWriteStream(path);

  basename = (path: string) => basename(path);
}
