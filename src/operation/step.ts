export interface Step {
  description(): string;
  action(): Promise<void>;
}
