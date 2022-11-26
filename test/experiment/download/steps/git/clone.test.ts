import * as td from 'testdouble';
import { afterEach, expect, test } from 'vitest';
import { Package } from '../../../../../src/adapter/pkg/package.js';
import { Is } from '../../../../../src/adapter/type/is.js';
import { Clone } from '../../../../../src/experiment/download/steps/git/clone';
import { GitGateway } from '../../../../../src/experiment/download/steps/git/git-gateway';
import { Material } from '../../../../../src/lab/cabinet/material/material.js';
import { Mixer } from '../../../../../src/lab/cabinet/mixer.js';
import { substanceFactory } from '../../../../factory/substance.js';

const cli = substanceFactory.cli.build();
const config = substanceFactory.config.build();
const {
  git: { branch },
} = cli;
const {
  git: { url },
} = config;
const compound = new Mixer().mix(config, cli);
const pkg = td.object<Package>();
const material = new Material(compound, pkg, new Is());
const gitGateway = td.object<GitGateway>();

afterEach(() => {
  td.reset();
});

test('provides clone step description', () => {
  const clone = new Clone(material, gitGateway);

  expect(clone.description()).toEqual(
    `Clone from ${url} and check out ${branch} branch`
  );
});

test('clones repo', async () => {
  const clone = new Clone(material, gitGateway);

  await clone.action();

  td.verify(gitGateway.clone(url, branch, material.download.destination));
});
