import type { Material } from '../lab/cabinet/material/material.js';
import { Disposal } from './disposal/disposal.js';
import { Download } from './download/download.js';
import type { Operation } from './operation.js';
import { Preparation } from './preparation/preparation.js';
import { Synthesis } from './synthesis/synthesis.js';

export type OpName = keyof typeof toc;

export class Catalog {
  operation = (opName: OpName, material: Material): Operation =>
    new toc[opName](material);
}

const toc = {
  dispose: Disposal,
  prepare: Preparation,
  download: Download,
  synth: Synthesis,
} as const;
