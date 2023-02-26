import { Box } from '../vendor/text/box.js';
import { Chalk } from '../vendor/text/chalk.js';

export class Title {
  constructor(
    private readonly chalk: Chalk,
    private readonly box: Box,
    private readonly logger: TitleLogger
  ) {}

  log(text: string, version: string) {
    this.logger(this.box.box(`${this.chalk.magenta(text)} ${version}`));
  }

  static build(logger: TitleLogger) {
    return new Title(new Chalk(), new Box(), logger);
  }
}

export type TitleLogger = (text: string) => void;
