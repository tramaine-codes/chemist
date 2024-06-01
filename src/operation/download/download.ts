import type { Material } from '../../lab/cabinet/material/material.js';
import { Preparation } from '../preparation/preparation.js';
import { Series } from '../series.js';
import { Study } from '../study.js';
import { Clone } from './steps/git/clone.js';

export class Download extends Study {
  constructor(material: Material) {
    super(new Preparation(material), new Series(Clone.from(material)));
  }
}
