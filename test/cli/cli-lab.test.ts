import * as td from 'testdouble';
import { afterEach, expect, test } from 'vitest';
import { CliLab } from '../../src/cli/cli-lab.js';
import type { Operation } from '../../src/operation/operation.js';
import type { Runner } from '../../src/vendor/runner/runner.js';

afterEach(() => {
  td.reset();
});

test('runs an operation', async () => {
  const runner = td.object<Runner>();
  const operation = td.object<Operation>();
  const lab = new CliLab(runner);

  await lab.run(operation);

  td.verify(runner.run(operation));
});

test('returns a cli lab', () => {
  expect(CliLab.build()).instanceOf(CliLab);
});
