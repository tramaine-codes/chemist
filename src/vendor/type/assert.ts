import { assert } from '@sindresorhus/is';

export class Assert {
  string(value: unknown): asserts value is string {
    return assert.string(value);
  }
}
