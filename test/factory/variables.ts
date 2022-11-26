import { faker } from '@faker-js/faker';
import { Factory } from 'fishery';
import { Variables } from '../../src/experiment/variables';

export const variablesFactory = Factory.define<Variables>(() => ({
  branch: faker.git.branch(),
}));
