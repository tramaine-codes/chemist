import type { Material } from '../../lab/cabinet/material/material.js';
import { Operation } from '../operation.js';
import { Series } from '../series.js';
import { Dispose } from './steps/dispose.js';

export class Disposal extends Operation {
  constructor(material: Material) {
    super(new Series(Dispose.from(material)));
  }
}
