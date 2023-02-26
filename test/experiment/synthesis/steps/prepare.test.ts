import * as td from 'testdouble';
import { afterEach, expect, test } from 'vitest';
import { Prepare } from '../../../../src/experiment/synthesis/steps/prepare.js';
import { Material } from '../../../../src/lab/cabinet/material/material.js';
import { FileSystem } from '../../../../src/vendor/file-system/file-system.js';
import { Package } from '../../../../src/vendor/pkg/package.js';
import { Is } from '../../../../src/vendor/type/is.js';
import { compoundFactory } from '../../../factory/compound.js';

const fs = td.object<FileSystem>();
const pkg = td.object<Package>();
const compound = compoundFactory.build();
const material = new Material(compound, pkg, new Is());

afterEach(() => {
  td.reset();
});

test('provides prepare step description', () => {
  const prepare = new Prepare(material, FileSystem.build());

  expect(prepare.description()).toEqual(
    `Create ${compound.compression.destination}/`
  );
});

test('makes compression destination directory', async () => {
  const prepare = new Prepare(material, fs);

  await prepare.action();

  td.verify(fs.mkdir(material.compression.destination));
});
