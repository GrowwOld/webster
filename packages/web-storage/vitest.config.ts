// eslint-disable-next-line import/no-unresolved
import { defineConfig } from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    environment: 'jsdom'
  }
});
