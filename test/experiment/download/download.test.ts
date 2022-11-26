import { format } from 'pretty-format';
import * as td from 'testdouble';
import { afterEach, expect, test } from 'vitest';
import { Download } from '../../../src/experiment/download/download.js';
import { Clone } from '../../../src/experiment/download/steps/git/clone.js';
import { Preparation } from '../../../src/experiment/preparation/preparation.js';
import { Material } from '../../../src/lab/cabinet/material/material.js';

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
