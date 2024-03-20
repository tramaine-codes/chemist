import { Command } from 'commander';
import { Chemist } from '../lab/chemist.js';
import { Variables } from '../operation/variables.js';
import { CliLab } from './cli-lab.js';
import { Release } from './release.js';
import { Title, TitleLogger } from './title.js';

export class Program {
  constructor(
    private readonly release: Release,
    private readonly title: Title,
    private readonly chemist: Chemist
  ) {}

  run = (argv: readonly string[]) => {
    const { name, version } = this.release;
    const program = setup(name, version, this.chemist);

    this.title.log(name, version);

    program.parseAsync(argv);
  };

  static from = (logger: TitleLogger) =>
    new Program(
      Release.build(),
      Title.build(logger),
      Chemist.from(CliLab.build())
    );
}

const setup = (name: string, version: string, chemist: Chemist) => {
  const program = new Command();

  program
    .name('chemist')
    .description(`${name} bundles source code into a compressed file`)
    .version(version);

  program
    .command('dispose')
    .alias('clean')
    .description('dispose of synthesized products')
    .action(async () => {
      await chemist.run('dispose');
    });

  program
    .command('prepare')
    .alias('prep')
    .description(
      'dispose of synthesized products and recreate .chemist directory'
    )
    .action(async () => {
      await chemist.run('prepare');
    });

  program
    .command('download')
    .description('download project')
    .requiredOption('-b, --branch <branch>', 'Git branch to clone', 'main')
    .action(async (variables: Variables) => {
      await chemist.run('download', variables);
    });

  program
    .command('synth', { isDefault: true })
    .alias('build')
    .description('synthesize compressed file')
    .requiredOption(
      '-b, --branch <branch>',
      'Git branch used to synthesize the compressed file',
      'main'
    )
    .action(async (variables: Variables) => {
      await chemist.run('synth', variables);
    });

  return program;
};
