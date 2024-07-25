import type { Material } from '../../lab/cabinet/material/material.js';
import { Operation } from '../operation.js';
import { Preparation } from '../preparation/preparation.js';
import { Series } from '../series.js';
import { Clone } from './steps/git/clone.js';

export class Download extends Operation {
  constructor(material: Material) {
    super(new Preparation(material), new Series(Clone.from(material)));
  }
}
