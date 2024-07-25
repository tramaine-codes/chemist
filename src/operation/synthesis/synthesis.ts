import type { Material } from '../../lab/cabinet/material/material.js';
import { Download } from '../download/download.js';
import { Operation } from '../operation.js';
import { Series } from '../series.js';
import { Compress } from './steps/compress.js';
import { Build } from './steps/npm/build.js';
import { InstallDeps } from './steps/npm/install-deps.js';
import { InstallProdDeps } from './steps/npm/install-prod-deps.js';
import { Prepare } from './steps/prepare.js';

export class Synthesis extends Operation {
  constructor(material: Material) {
    super(
      new Download(material),
      new Series(
        Prepare.from(material),
        InstallDeps.from(material),
        Build.from(material),
        InstallProdDeps.from(material),
        Compress.from(material)
      )
    );
  }
}
