import { expect, test } from 'vitest';
import { Catalog } from '../../src/experiment/catalog.js';
import { Disposal } from '../../src/experiment/disposal/disposal.js';
import { Download } from '../../src/experiment/download/download.js';
import { Preparation } from '../../src/experiment/preparation/preparation.js';
import { Synthesis } from '../../src/experiment/synthesis/synthesis.js';
import { Cabinet } from '../../src/lab/cabinet/cabinet.js';
import { Mixer } from '../../src/lab/cabinet/mixer.js';
import { LabTech } from '../../src/lab/lab-tech.js';

const tech = new LabTech(new Catalog(), Cabinet.build(), new Mixer());

test('preps the dispose', () => {
  const experiment = tech.prep('dispose');

  expect(experiment).toBeInstanceOf(Disposal);
});

test('preps the prepare', () => {
  const experiment = tech.prep('prepare');

  expect(experiment).toBeInstanceOf(Preparation);
});

test('preps the download', () => {
  const experiment = tech.prep('download');

  expect(experiment).toBeInstanceOf(Download);
});

test('preps the synth', () => {
  const experiment = tech.prep('synth');

  expect(experiment).toBeInstanceOf(Synthesis);
});
