export interface ConfigSubstance {
  readonly name: string;
  readonly download: {
    readonly destination: string;
  };
  readonly git: {
    readonly url: string;
  };
  readonly compression: {
    readonly destination: string;
    readonly include: readonly string[];
  };
}

export interface CliSubstance {
  readonly git: {
    readonly branch: string;
  };
}
