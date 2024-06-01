import * as td from 'testdouble';
import { afterEach, expect, test } from 'vitest';
import { Title, type TitleLogger } from '../../src/cli/title.js';
import type { Box } from '../../src/vendor/text/box.js';
import type { Chalk } from '../../src/vendor/text/chalk.js';

const chalk = td.object<Chalk>();
const box = td.object<Box>();
const logger = td.func<TitleLogger>();

afterEach(() => {
  td.reset();
});

test('logs the title to a logger', () => {
  const text = 'foo';
  const version = '1.0.0';
  const chalkText = `* ${text} *`;
  const boxText = `* ${chalkText} * ${version}`;
  const title = new Title(chalk, box, logger);
  td.when(chalk.magenta(text)).thenReturn(chalkText);
  td.when(box.box(`${chalkText} ${version}`)).thenReturn(boxText);

  title.log(text, version);

  td.verify(logger(boxText));
});

test('builds a title', () => {
  expect(Title.build(logger)).toBeInstanceOf(Title);
});
