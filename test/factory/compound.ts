import { Factory } from 'fishery';
import type { Compound } from '../../src/lab/cabinet/material/compound';
import { Mixer } from '../../src/lab/cabinet/mixer';
import { substanceFactory } from './substance.js';

const mixer = new Mixer();

export const compoundFactory = Factory.define<Compound>(() => {
  const cli = substanceFactory.cli.build();
  const config = substanceFactory.config.build();

  return mixer.mix(config, cli);
});
