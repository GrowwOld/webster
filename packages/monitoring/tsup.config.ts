import { defineConfig } from 'tsup';
import { globPlugin } from 'esbuild-plugin-glob';

export default defineConfig({
  entry: [ 'src/*.ts' ],
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
