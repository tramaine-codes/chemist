import { expect, test } from 'vitest';
import { Cabinet } from '../../src/lab/cabinet/cabinet.js';
import { Mixer } from '../../src/lab/cabinet/mixer.js';
import { LabTech } from '../../src/lab/lab-tech.js';
import { Catalog } from '../../src/operation/catalog.js';
import { Disposal } from '../../src/operation/disposal/disposal.js';
import { Download } from '../../src/operation/download/download.js';
import { Preparation } from '../../src/operation/preparation/preparation.js';
import { Synthesis } from '../../src/operation/synthesis/synthesis.js';

const tech = new LabTech(new Catalog(), Cabinet.build(), new Mixer());

test('preps the dispose', () => {
  const operation = tech.prep('dispose');

  expect(operation).toBeInstanceOf(Disposal);
});

test('preps the prepare', () => {
  const operation = tech.prep('prepare');

  expect(operation).toBeInstanceOf(Preparation);
});

test('preps the download', () => {
  const operation = tech.prep('download');

  expect(operation).toBeInstanceOf(Download);
});

test('preps the synth', () => {
  const operation = tech.prep('synth');

  expect(operation).toBeInstanceOf(Synthesis);
});
