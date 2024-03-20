import * as td from 'testdouble';
import { afterEach, test } from 'vitest';
import { GitGateway } from '../../../src/infrastructure/git/git-gateway.js';
import { Process } from '../../../src/vendor/process/process.js';

const process = td.object<Process>();

afterEach(() => {
  td.reset();
});

test('clones repo', async () => {
  const url = 'foo';
  const branch = 'bar';
  const destination = 'baz';
  const gitGateway = new GitGateway(process);

  await gitGateway.clone(url, branch, destination);

  td.verify(
    process.exec('git', [
      'clone',
      '-b',
      branch,
      '--single-branch',
      url,
      destination,
    ])
  );
});
