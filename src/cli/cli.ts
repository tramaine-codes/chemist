#!/usr/bin/env node
import { Program } from './program.js';

// eslint-disable-next-line no-console
Program.from(console.log).run(process.argv);
