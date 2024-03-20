import { format } from 'pretty-format';
import * as td from 'testdouble';
import { afterEach, expect, test } from 'vitest';
import { Material } from '../../../src/lab/cabinet/material/material.js';
import { Disposal } from '../../../src/operation/disposal/disposal.js';
import { Preparation } from '../../../src/operation/preparation/preparation.js';
import { Prepare } from '../../../src/operation/preparation/steps/prepare.js';

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
