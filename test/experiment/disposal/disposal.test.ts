import { format } from 'pretty-format';
import * as td from 'testdouble';
import { afterEach, expect, test } from 'vitest';
import { Disposal } from '../../../src/experiment/disposal/disposal.js';
import { Dispose } from '../../../src/experiment/disposal/steps/dispose.js';
import { Material } from '../../../src/lab/cabinet/material/material.js';

const material = td.object<Material>();

afterEach(() => {
  td.reset();
});

test('provides disposal steps', () => {
  const expectedSteps = [Dispose.from(material)];

  const { steps } = new Disposal(material);

  expect(format(steps)).toEqual(format(expectedSteps));
});
