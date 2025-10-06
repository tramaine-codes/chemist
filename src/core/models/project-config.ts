export interface ProjectConfig {
  readonly name: string;
  readonly download: {
    readonly destination: string;
  };
  readonly git: {
    readonly url: string;
  };
  readonly compression: {
    readonly destination: string;
    readonly include: ReadonlyArray<string>;
  };
}

export interface RuntimeOptions {
  readonly branch: string;
}

export type MergedConfig = ProjectConfig & {
  readonly git: {
    readonly url: string;
    readonly branch: string;
  };
};
