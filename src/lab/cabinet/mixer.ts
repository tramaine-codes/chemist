import { Compound } from './material/compound.js';
import { CliSubstance, ConfigSubstance } from './material/substance.js';

export class Mixer {
  mix(config: ConfigSubstance, cli: CliSubstance): Compound {
    return {
      ...config,
      ...cli,
      git: {
        url: config.git.url,
        branch: cli.git.branch,
      },
    };
  }
}
