import * as td from 'testdouble';
import { afterEach, test } from 'vitest';
import { NpmGateway } from '../../../src/infrastructure/npm/npm-gateway.js';
import { Process } from '../../../src/vendor/process/process.js';

const process = td.object<Process>();

afterEach(() => {
  td.reset();
});

test('builds project', async () => {
  const destination = 'foo';
  const npmGateway = new NpmGateway(process);

  await npmGateway.build(destination);

  td.verify(process.exec('npm', ['run', 'build'], destination));
});

test('installs dependencies', async () => {
  const destination = 'foo';
  const npmGateway = new NpmGateway(process);

  await npmGateway.installDeps(destination);

  td.verify(process.exec('npm', ['install'], destination));
});

test('installs production dependencies', async () => {
  const destination = 'foo';
  const npmGateway = new NpmGateway(process);

  await npmGateway.installProdDeps(destination);

  td.verify(process.exec('npm', ['install', '--omit=dev'], destination));
});
