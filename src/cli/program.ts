import { Command } from 'commander';
import type { RuntimeOptions } from '../core/models/project-config.js';
import { Application } from '../core/application.js';
import { Release } from './release.js';
import { Title, type TitleLogger } from './title.js';

export class Program {
  constructor(
    private readonly release: Release,
    private readonly title: Title,
    private readonly application: Application
  ) {}

  run = (argv: ReadonlyArray<string>) => {
    const { name, version } = this.release;
    const program = setup(name, version, this.application);

    this.title.log(name, version);

    program.parseAsync(argv);
  };

  static from = (logger: TitleLogger) =>
    new Program(Release.build(), Title.build(logger), Application.build());
}

const setup = (name: string, version: string, application: Application) => {
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
      await application.run('dispose');
    });

  program
    .command('prepare')
    .alias('prep')
    .description(
      'dispose of synthesized products and recreate .chemist directory'
    )
    .action(async () => {
      await application.run('prepare');
    });

  program
    .command('download')
    .description('download project')
    .requiredOption('-b, --branch <branch>', 'Git branch to clone', 'main')
    .action(async (options: RuntimeOptions) => {
      await application.run('download', options);
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
    .action(async (options: RuntimeOptions) => {
      await application.run('synth', options);
    });

  return program;
};
