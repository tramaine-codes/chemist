import * as td from 'testdouble';
import { afterEach, beforeEach, expect, test } from 'vitest';
import { Program } from '../../src/cli/program.js';
import { Release } from '../../src/cli/release.js';
import { Title, TitleLogger } from '../../src/cli/title.js';
import { Chemist } from '../../src/lab/chemist';

Release.build = td.func(Release.build);
const logger = td.func<TitleLogger>();

const name = 'foo';
const version = 'bar';

const argv = (...args: readonly string[]) => ['node', 'cli.js', ...args];
const program = (chemist: Chemist) =>
  new Program(Release.build(), Title.build(logger), chemist);

beforeEach(() => {
  td.when(Release.build()).thenReturn({ name, version });
});

afterEach(() => {
  td.reset();
});

test('runs dispose', () => {
  const chemist = td.object<Chemist>();

  program(chemist).run(argv('dispose'));

  td.verify(chemist.run('dispose'));
});

test('runs prepare', () => {
  const chemist = td.object<Chemist>();

  program(chemist).run(argv('prepare'));

  td.verify(chemist.run('prepare'));
});

test('runs download', () => {
  const chemist = td.object<Chemist>();

  program(chemist).run(argv('download', '-b', 'baz'));

  td.verify(chemist.run('download', { branch: 'baz' }));
});

test('runs download with main branch as default', async () => {
  const chemist = td.object<Chemist>();

  program(chemist).run(argv('download'));

  td.verify(chemist.run('download', { branch: 'main' }));
});

test('runs synth', () => {
  const chemist = td.object<Chemist>();

  program(chemist).run(argv('synth', '-b', 'qux'));

  td.verify(chemist.run('synth', { branch: 'qux' }));
});

test('runs synth with main branch as default', () => {
  const chemist = td.object<Chemist>();

  program(chemist).run(argv('synth'));

  td.verify(chemist.run('synth', { branch: 'main' }));
});

test('runs synth by default', () => {
  const chemist = td.object<Chemist>();

  program(chemist).run(argv('-b', 'quux'));

  td.verify(chemist.run('synth', { branch: 'quux' }));
});

test('builds a program', () => {
  expect(Program.from(logger)).toBeInstanceOf(Program);
});
