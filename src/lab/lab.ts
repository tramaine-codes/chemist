import type { Process } from '../operation/process.js';

export interface Lab {
  run(operation: Process): Promise<void>;
}
