import * as td from 'testdouble';
import { afterEach, beforeEach, expect, test } from 'vitest';
import { Experiment } from '../../src/experiment/experiment.js';
import { Chemist } from '../../src/lab/chemist.js';
import { LabTech } from '../../src/lab/lab-tech.js';
import { Lab } from '../../src/lab/lab.js';
import { variablesFactory } from '../factory/variables.js';

const lab = td.object<Lab>();
const tech = td.object<LabTech>();
const experiment = td.object<Experiment>();
const variables = variablesFactory.build();

beforeEach(() => {
  td.when(tech.prep('synth', variables)).thenReturn<Experiment>(experiment);
});

afterEach(() => {
  td.reset();
});

test('runs an experiment', async () => {
  const chemist = new Chemist(lab, tech);

  await chemist.run('synth', variables);

  td.verify(lab.run(experiment));
});

test('builds a chemist', () => {
  expect(Chemist.from(lab)).toBeInstanceOf(Chemist);
});
