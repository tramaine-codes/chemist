import * as td from 'testdouble';
import { afterEach, expect, test } from 'vitest';
import type { NpmGateway } from '../../../../../src/infrastructure/npm/npm-gateway.js';
import { Material } from '../../../../../src/lab/cabinet/material/material.js';
import { Build } from '../../../../../src/operation/synthesis/steps/npm/build.js';
import type { Package } from '../../../../../src/vendor/pkg/package.js';
import { Is } from '../../../../../src/vendor/type/is.js';
import { compoundFactory } from '../../../../factory/compound.js';

const pkg = td.object<Package>();
const npmGateway = td.object<NpmGateway>();
const compound = compoundFactory.build();
const material = new Material(compound, pkg, new Is());
const {
  download: { destination: downloadDir },
} = material;

afterEach(() => {
  td.reset();
});

test('provides build step description', () => {
  const compress = new Build(material, npmGateway);

  expect(compress.description()).toEqual('Build project');
});

test('builds project', async () => {
  const compress = new Build(material, npmGateway);

  await compress.action();

  td.verify(npmGateway.build(downloadDir));
});
