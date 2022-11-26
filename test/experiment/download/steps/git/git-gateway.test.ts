import * as td from 'testdouble';
import { afterEach, test } from 'vitest';
import { Process } from '../../../../../src/adapter/process/process.js';
import { GitGateway } from '../../../../../src/experiment/download/steps/git/git-gateway.js';

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
