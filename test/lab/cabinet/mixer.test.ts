import { expect, test } from 'vitest';
import { Mixer } from '../../../src/lab/cabinet/mixer.js';
import { substanceFactory } from '../../factory/substance.js';

const config = substanceFactory.config.build();
const cli = substanceFactory.cli.build();

test('makes compounds', () => {
  const {
    name,
    download,
    git: { url },
    compression,
  } = config;
  const {
    git: { branch },
  } = cli;
  const mixer = new Mixer();

  const compound = mixer.mix(config, cli);

  expect(compound).toEqual({
    name,
    download,
    git: {
      url,
      branch,
    },
    compression,
  });
});
