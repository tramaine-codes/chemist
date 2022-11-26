export interface Experiment {
  readonly steps: readonly Step[];
}

export interface Step {
  description(): string;
  action(): Promise<void>;
}
