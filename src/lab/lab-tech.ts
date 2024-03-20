import { Catalog, CatalogListing } from '../operation/catalog.js';
import { Variables } from '../operation/variables.js';
import { Cabinet } from './cabinet/cabinet.js';
import { Material } from './cabinet/material/material.js';
import { Mixer } from './cabinet/mixer.js';

export class LabTech {
  constructor(
    private readonly catalog: Catalog,
    private readonly cabinet: Cabinet,
    private readonly mixer: Mixer
  ) {}

  prep = (listing: CatalogListing, variables?: Variables) =>
    this.catalog.experiment(listing, this.material(variables));

  private material = (variables?: Variables) =>
    Material.from(this.compound(variables));

  private compound = (variables?: Variables) =>
    this.mixer.mix(this.cabinet.config(), this.cabinet.variables(variables));

  static build = () => new LabTech(new Catalog(), Cabinet.build(), new Mixer());
}
