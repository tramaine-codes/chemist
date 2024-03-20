import { format } from 'pretty-format';
import * as td from 'testdouble';
import { afterEach, expect, test } from 'vitest';
import { Material } from '../../../src/lab/cabinet/material/material.js';
import { Download } from '../../../src/operation/download/download.js';
import { Clone } from '../../../src/operation/download/steps/git/clone.js';
import { Preparation } from '../../../src/operation/preparation/preparation.js';

const material = td.object<Material>();

afterEach(() => {
  td.reset();
});

test('provides download steps', () => {
  const { steps: preparationSteps } = new Preparation(material);
  const expectedSteps = [...preparationSteps, Clone.from(material)];

  const { steps } = new Download(material);

  expect(format(steps)).toEqual(format(expectedSteps));
});
