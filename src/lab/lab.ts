import type { Operation } from '../operation/operation.js';

export interface Lab {
  run(operation: Operation): Promise<void>;
}
