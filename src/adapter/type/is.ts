import is from '@sindresorhus/is';

export class Is {
  nullOrUndefined(value: unknown): value is null | undefined {
    return is.nullOrUndefined(value);
  }
}
