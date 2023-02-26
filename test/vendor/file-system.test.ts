import fs from 'fs';
import * as td from 'testdouble';
import { afterEach, expect, test } from 'vitest';
import { FileSystem } from '../../src/vendor/file-system/file-system.js';
import { Operations } from '../../src/vendor/file-system/operations.js';
import { Zip } from '../../src/vendor/file-system/zip.js';

const operations = td.object<Operations>();
const zip = td.object<Zip>();
const patterns = ['foo', 'bar', 'baz'];
const stream = td.object<fs.WriteStream>();
const fileSystem = new FileSystem(operations, zip);

afterEach(() => {
  td.reset();
});

test('creates directories', () => {
  fileSystem.mkdir('foo');

  td.verify(operations.mkdir('foo'));
});

test('remove files/directories', () => {
  fileSystem.rm(...patterns);

  td.verify(operations.rm(patterns));
});

test('builds zip file', () => {
  const destination = 'qux';
  td.when(operations.writeStream(destination)).thenReturn<fs.WriteStream>(
    stream
  );

  fileSystem.zip(destination, patterns, destination);

  td.verify(zip.zip(stream, patterns, destination));
});

test('builds a file system object', () => {
  expect(FileSystem.build()).instanceOf(FileSystem);
});
