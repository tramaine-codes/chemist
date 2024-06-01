import type { Material } from '../../lab/cabinet/material/material.js';
import { Disposal } from '../disposal/disposal.js';
import { Series } from '../series.js';
import { Study } from '../study.js';
import { Prepare } from './steps/prepare.js';

export class Preparation extends Study {
  constructor(material: Material) {
    super(new Disposal(material), new Series(Prepare.from(material)));
  }
}
