import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      exclude: ['src/vendor/**', '!src/vendor/file-system.ts'],
    },
  },
});
