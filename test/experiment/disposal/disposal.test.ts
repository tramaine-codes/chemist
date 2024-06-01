import { format } from 'pretty-format';
import * as td from 'testdouble';
import { afterEach, expect, test } from 'vitest';
import type { Material } from '../../../src/lab/cabinet/material/material.js';
import { Disposal } from '../../../src/operation/disposal/disposal.js';
import { Dispose } from '../../../src/operation/disposal/steps/dispose.js';

const material = td.object<Material>();

afterEach(() => {
  td.reset();
});

test('provides disposal steps', () => {
  const expectedSteps = [Dispose.from(material)];

  const { steps } = new Disposal(material);

  expect(format(steps)).toEqual(format(expectedSteps));
});
