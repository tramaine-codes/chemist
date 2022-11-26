import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      exclude: ['src/adapter/**', '!src/adapter/file-system.ts'],
    },
  },
});
