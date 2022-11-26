import * as td from 'testdouble';
import { afterEach, expect, test } from 'vitest';
import { FileSystem } from '../../../../src/adapter/file-system/file-system.js';
import { Package } from '../../../../src/adapter/pkg/package.js';
import { Is } from '../../../../src/adapter/type/is.js';
import { Dispose } from '../../../../src/experiment/disposal/steps/dispose.js';
import { Material } from '../../../../src/lab/cabinet/material/material.js';
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
