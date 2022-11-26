import { format } from 'pretty-format';
import * as td from 'testdouble';
import { afterEach, expect, test } from 'vitest';
import { Disposal } from '../../../src/experiment/disposal/disposal.js';
import { Preparation } from '../../../src/experiment/preparation/preparation.js';
import { Prepare } from '../../../src/experiment/preparation/steps/prepare.js';
import { Material } from '../../../src/lab/cabinet/material/material.js';

const material = td.object<Material>();

afterEach(() => {
  td.reset();
});

test('provides preparation steps', () => {
  const { steps: disposalSteps } = new Disposal(material);
  const expectedSteps = [...disposalSteps, Prepare.from(material)];

  const { steps } = new Preparation(material);

  expect(format(steps)).toEqual(format(expectedSteps));
});
