import { format } from 'pretty-format';
import * as td from 'testdouble';
import { afterEach, expect, test } from 'vitest';
import { Material } from '../../../src/lab/cabinet/material/material.js';
import { Download } from '../../../src/operation/download/download.js';
import { Compress } from '../../../src/operation/synthesis/steps/compress.js';
import { Build } from '../../../src/operation/synthesis/steps/npm/build.js';
import { InstallDeps } from '../../../src/operation/synthesis/steps/npm/install-deps.js';
import { InstallProdDeps } from '../../../src/operation/synthesis/steps/npm/install-prod-deps.js';
import { Prepare } from '../../../src/operation/synthesis/steps/prepare.js';
import { Synthesis } from '../../../src/operation/synthesis/synthesis.js';

const material = td.object<Material>();

afterEach(() => {
  td.reset();
});

test('provides download steps', () => {
  const { steps: downloadSteps } = new Download(material);
  const expectedSteps = [
    ...downloadSteps,
    Prepare.from(material),
    InstallDeps.from(material),
    Build.from(material),
    InstallProdDeps.from(material),
    Compress.from(material),
  ];

  const { steps } = new Synthesis(material);

  expect(format(steps)).toEqual(format(expectedSteps));
});
