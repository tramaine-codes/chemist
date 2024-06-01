import type { Compound } from './material/compound.js';
import type { CliSubstance, ConfigSubstance } from './material/substance.js';

export class Mixer {
  mix = (config: ConfigSubstance, cli: CliSubstance): Compound => ({
    ...config,
    ...cli,
    git: {
      url: config.git.url,
      branch: cli.git.branch,
    },
  });
}
