import * as td from 'testdouble';
import { afterEach, beforeEach, expect, test } from 'vitest';
import { Release } from '../../src/cli/release.js';
import type { Package } from '../../src/vendor/pkg/package.js';

const pkg = td.object<Package>();

beforeEach(() => {
  td.when(pkg.packageVersionSync()).thenReturn('foo');
});

afterEach(() => {
  td.reset();
});

test('provides version', () => {
  const { version } = new Release(pkg);

  expect(version).toEqual('foo');
});

test('provides name', () => {
  const { name } = new Release(pkg);

  expect(name).toEqual('Chemist');
});

test('builds a release', () => {
  expect(Release.build()).instanceOf(Release);
});
