import { faker } from '@faker-js/faker';
import { Factory } from 'fishery';
import {
  CliSubstance,
  ConfigSubstance,
} from '../../src/lab/cabinet/material/substance';

const cli = Factory.define<CliSubstance>(() => ({
  git: {
    branch: faker.git.branch(),
  },
}));

const config = Factory.define<ConfigSubstance>(() => ({
  name: faker.company.buzzVerb(),
  download: {
    destination: faker.word.noun(),
  },
  git: {
    url: faker.internet.url(),
  },
  compression: {
    destination: faker.lorem.word(),
    include: [faker.system.fileName(), faker.system.fileName()],
  },
}));

export const substanceFactory = { cli, config };
