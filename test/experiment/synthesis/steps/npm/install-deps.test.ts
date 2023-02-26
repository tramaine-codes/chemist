import * as td from 'testdouble';
import { afterEach, expect, test } from 'vitest';
import { InstallDeps } from '../../../../../src/experiment/synthesis/steps/npm/install-deps.js';
import { Material } from '../../../../../src/lab/cabinet/material/material.js';
import { Package } from '../../../../../src/vendor/pkg/package.js';
import { Process } from '../../../../../src/vendor/process/process.js';
import { Is } from '../../../../../src/vendor/type/is.js';
import { compoundFactory } from '../../../../factory/compound.js';

const pkg = td.object<Package>();
const process = td.object<Process>();
const compound = compoundFactory.build();
const material = new Material(compound, pkg, new Is());
const {
  download: { destination: downloadDir },
} = material;

afterEach(() => {
  td.reset();
});

test('provides install deps step description', () => {
  const compress = new InstallDeps(material, process);

  expect(compress.description()).toEqual('Install dependencies');
});

test('builds project', async () => {
  const compress = new InstallDeps(material, process);

  await compress.action();

  td.verify(process.exec('npm', ['install'], downloadDir));
});
