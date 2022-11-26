import { Experiment } from '../experiment/experiment.js';

export interface Lab {
  run(experiment: Experiment): Promise<void>;
}
