import * as td from 'testdouble';
import { afterEach, expect, test } from 'vitest';
import { CliLab } from '../../src/cli/cli-lab.js';
import { Experiment } from '../../src/experiment/experiment.js';
import { Runner } from '../../src/vendor/runner/runner.js';

afterEach(() => {
  td.reset();
});

test('runs an experiment', async () => {
  const runner = td.object<Runner>();
  const experiment = td.object<Experiment>();
  const lab = new CliLab(runner);

  await lab.run(experiment);

  td.verify(runner.run(experiment));
});

test('returns a cli lab', () => {
  expect(CliLab.build()).instanceOf(CliLab);
});
