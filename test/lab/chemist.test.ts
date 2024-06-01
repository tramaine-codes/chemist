import * as td from 'testdouble';
import { afterEach, beforeEach, expect, test } from 'vitest';
import { Chemist } from '../../src/lab/chemist.js';
import type { LabTech } from '../../src/lab/lab-tech.js';
import type { Lab } from '../../src/lab/lab.js';
import type { Operation } from '../../src/operation/operation.js';
import { variablesFactory } from '../factory/variables.js';

const lab = td.object<Lab>();
const tech = td.object<LabTech>();
const operation = td.object<Operation>();
const variables = variablesFactory.build();

beforeEach(() => {
  td.when(tech.prep('synth', variables)).thenReturn<Operation>(operation);
});

afterEach(() => {
  td.reset();
});

test('runs an operation', async () => {
  const chemist = new Chemist(lab, tech);

  await chemist.run('synth', variables);

  td.verify(lab.run(operation));
});

test('builds a chemist', () => {
  expect(Chemist.from(lab)).toBeInstanceOf(Chemist);
});
