import type { Material } from '../lab/cabinet/material/material.js';
import { Disposal } from './disposal/disposal.js';
import { Download } from './download/download.js';
import { Preparation } from './preparation/preparation.js';
import type { Process } from './process.js';
import { Synthesis } from './synthesis/synthesis.js';

export type CatalogListing = keyof typeof toc;

export class Catalog {
  operation = (listing: CatalogListing, material: Material): Process =>
    new toc[listing](material);
}

const toc = {
  dispose: Disposal,
  prepare: Preparation,
  download: Download,
  synth: Synthesis,
} as const;
