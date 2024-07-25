import type { Material } from '../../lab/cabinet/material/material.js';
import { Disposal } from '../disposal/disposal.js';
import { Operation } from '../operation.js';
import { Series } from '../series.js';
import { Prepare } from './steps/prepare.js';

export class Preparation extends Operation {
  constructor(material: Material) {
    super(new Disposal(material), new Series(Prepare.from(material)));
  }
}
