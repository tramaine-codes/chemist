import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      include: ['src/**/*.ts'],
      exclude: [
        'src/index.ts',
        'src/cli/cli.ts',
        'src/vendor/**',
        '!src/vendor/file-system.ts',
      ],
    },
  },
});
