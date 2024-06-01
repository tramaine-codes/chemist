import * as td from 'testdouble';
import { afterEach, beforeEach, expect, test } from 'vitest';
import { Material } from '../../../../src/lab/cabinet/material/material.js';
import { Mixer } from '../../../../src/lab/cabinet/mixer.js';
import type { Package } from '../../../../src/vendor/pkg/package.js';
import { Is } from '../../../../src/vendor/type/is.js';
import { substanceFactory } from '../../../factory/substance.js';

const config = substanceFactory.config.build();
const cli = substanceFactory.cli.build();

const compound = new Mixer().mix(config, cli);
const pkg = td.object<Package>();
const rootDir = 'foo';

const material = new Material(compound, pkg, new Is());

beforeEach(() => {
  td.when(pkg.rootDir()).thenReturn<string>(rootDir);
});

afterEach(() => {
  td.reset();
});

test('provides name', () => {
  const { name: expected } = config;

  const { name: actual } = material;

  expect(actual).toEqual(expected);
});

test('provides git settings', () => {
  const {
    git: { url },
  } = config;
  const {
    git: { branch },
  } = cli;

  const { git } = material;

  expect(git).toEqual({
    url,
    branch,
  });
});

test('provides compression settings', () => {
  const {
    compression: { destination, include },
  } = config;

  const { compression } = material;

  expect(compression).toEqual({
    destination: `${rootDir}/${destination}`,
    include,
  });
});

test('provides the download directory path and name', () => {
  const {
    download: { destination },
  } = config;

  expect(material.download.destination).toEqual(`${rootDir}/${destination}`);
});

test('build material from compounds', () => {
  expect(Material.from(compound)).toBeInstanceOf(Material);
});
