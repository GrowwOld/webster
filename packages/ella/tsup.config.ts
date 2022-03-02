import { defineConfig } from 'tsup';
import { globPlugin } from 'esbuild-plugin-glob';

export default defineConfig({
  // entry: [ './src/index.ts' ],
  entry: [ 'src/**/*.ts', 'src/**/*.tsx' ],
  esbuildPlugins: [ globPlugin() ],
  splitting: true,
  sourcemap: false,
  clean: true,
  format: [ 'cjs', 'esm' ],
  legacyOutput: true,
  minify: true,
  keepNames: false,
  skipNodeModulesBundle: true,
  dts: true,
  tsconfig: './tsconfig.json'
});
