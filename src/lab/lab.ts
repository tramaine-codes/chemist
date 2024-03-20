import { Operation } from '../operation/operation.js';

export interface Lab {
  run(experiment: Operation): Promise<void>;
}
