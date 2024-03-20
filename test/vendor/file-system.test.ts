import fs from 'fs';
import * as td from 'testdouble';
import { afterEach, expect, test } from 'vitest';
import { FileOperations } from '../../src/vendor/file-system/file-operations.js';
import { FileSystem } from '../../src/vendor/file-system/file-system.js';
import { Zip } from '../../src/vendor/file-system/zip.js';

const fileOperations = td.object<FileOperations>();
const zip = td.object<Zip>();
const patterns = ['foo', 'bar', 'baz'];
const stream = td.object<fs.WriteStream>();
const fileSystem = new FileSystem(fileOperations, zip);

afterEach(() => {
  td.reset();
});

test('creates directories', () => {
  fileSystem.mkdir('foo');

  td.verify(fileOperations.mkdir('foo'));
});

test('remove files/directories', () => {
  fileSystem.rm(...patterns);

  td.verify(fileOperations.rm(patterns));
});

test('builds zip file', () => {
  const destination = 'qux';
  td.when(fileOperations.writeStream(destination)).thenReturn<fs.WriteStream>(
    stream
  );

  fileSystem.zip(destination, patterns, destination);

  td.verify(zip.zip(stream, patterns, destination));
});

test('builds a file system object', () => {
  expect(FileSystem.build()).instanceOf(FileSystem);
});
