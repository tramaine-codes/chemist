import * as td from 'testdouble';
import { afterEach, expect, test } from 'vitest';
import { Material } from '../../../../src/lab/cabinet/material/material.js';
import { Dispose } from '../../../../src/operation/disposal/steps/dispose.js';
import { FileSystem } from '../../../../src/vendor/file-system/file-system.js';
import { Package } from '../../../../src/vendor/pkg/package.js';
import { Is } from '../../../../src/vendor/type/is.js';
import { compoundFactory } from '../../../factory/compound.js';

const pkg = td.object<Package>();
const compound = compoundFactory.build();
const material = new Material(compound, pkg, new Is());

afterEach(() => {
  td.reset();
});

test('provides dispose step description', () => {
  const { compression, download } = compound;
  const dispose = new Dispose(material, FileSystem.build());

  expect(dispose.description()).toEqual(
    `Delete ${download.destination}/ and ${compression.destination}/`
  );
});

test('removes download and destination directories', async () => {
  const { compression, download } = material;
  const fs = td.object<FileSystem>();
  const dispose = new Dispose(material, fs);

  await dispose.action();

  td.verify(fs.rm(download.destination, compression.destination));
});
