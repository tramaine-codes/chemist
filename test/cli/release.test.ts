import * as td from 'testdouble';
import { afterEach, beforeEach, expect, test } from 'vitest';
import { Package } from '../../src/adapter/pkg/package.js';
import { Release } from '../../src/cli/release.js';

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
