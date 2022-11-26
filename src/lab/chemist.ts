import { CatalogListing } from '../experiment/catalog.js';
import { Lab } from './lab.js';
import { LabTech } from './lab-tech.js';
import { Variables } from '../experiment/variables.js';

export class Chemist {
  constructor(private readonly lab: Lab, private readonly tech: LabTech) {}

  async run(listing: CatalogListing, variables?: Variables) {
    await this.lab.run(this.tech.prep(listing, variables));
  }

  static from(lab: Lab) {
    return new Chemist(lab, LabTech.build());
  }
}
