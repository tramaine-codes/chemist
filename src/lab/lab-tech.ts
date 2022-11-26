import { Catalog, CatalogListing } from '../experiment/catalog.js';
import { Variables } from '../experiment/variables.js';
import { Cabinet } from './cabinet/cabinet.js';
import { Material } from './cabinet/material/material.js';
import { Mixer } from './cabinet/mixer.js';

export class LabTech {
  constructor(
    private readonly catalog: Catalog,
    private readonly cabinet: Cabinet,
    private readonly mixer: Mixer
  ) {}

  prep(listing: CatalogListing, variables?: Variables) {
    return this.catalog.experiment(listing, this.material(variables));
  }

  private material(variables?: Variables) {
    return Material.from(this.compound(variables));
  }

  private compound(variables?: Variables) {
    return this.mixer.mix(
      this.cabinet.config(),
      this.cabinet.variables(variables)
    );
  }

  static build() {
    return new LabTech(new Catalog(), Cabinet.build(), new Mixer());
  }
}
