import * as td from 'testdouble';
import { format } from 'pretty-format';
import { afterEach, expect, test } from 'vitest';
import { Download } from '../../../src/experiment/download/download.js';
import { Compress } from '../../../src/experiment/synthesis/steps/compress.js';
import { Build } from '../../../src/experiment/synthesis/steps/npm/build.js';
import { InstallDeps } from '../../../src/experiment/synthesis/steps/npm/install-deps.js';
import { InstallProdDeps } from '../../../src/experiment/synthesis/steps/npm/install-prod-deps.js';
import { Prepare } from '../../../src/experiment/synthesis/steps/prepare.js';
import { Synthesis } from '../../../src/experiment/synthesis/synthesis.js';
import { Material } from '../../../src/lab/cabinet/material/material.js';

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
