import * as td from 'testdouble';
import { afterEach, expect, test } from 'vitest';
import { Loader } from '../../../src/adapter/config/loader.js';
import { Is } from '../../../src/adapter/type/is.js';
import { Cabinet } from '../../../src/lab/cabinet/cabinet.js';
import { ConfigSubstance } from '../../../src/lab/cabinet/material/substance.js';
import { substanceFactory } from '../../factory/substance.js';

const loader = td.object<Loader>();
const config = substanceFactory.config.build();

afterEach(() => {
  td.reset();
});

test('provides config substance', () => {
  td.when(loader.load()).thenReturn<ConfigSubstance>(config);

  expect(new Cabinet(loader, new Is()).config()).toEqual(config);
});

test('throws an error when config file is not found', () => {
  td.when(loader.load()).thenReturn<undefined>(undefined);

  expect(() => {
    new Cabinet(loader, new Is()).config();
  }).toThrow('chemist configuration not found');
});
