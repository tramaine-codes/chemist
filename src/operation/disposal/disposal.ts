import type { Material } from '../../lab/cabinet/material/material.js';
import { Series } from '../series.js';
import { Study } from '../study.js';
import { Dispose } from './steps/dispose.js';

export class Disposal extends Study {
  constructor(material: Material) {
    super(new Series(Dispose.from(material)));
  }
}
