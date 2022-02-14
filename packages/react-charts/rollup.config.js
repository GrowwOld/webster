import postcssImport from 'postcss-import';
import postcssUrl from 'postcss-url';
import babel from 'rollup-plugin-babel';
import external from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import { terser } from 'rollup-plugin-terser';

import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';

import { getInputFiles } from './rollup.input';

const commonConfig = {
  plugins: [
    commonjs(),
    postcss({
      plugins: [ postcssImport(), postcssUrl({ url: 'inline' }) ],
      extract: true,
      extract: 'index.css',
      extensions: [ '.css' ]
    }),
    typescript(),
    babel({
      exclude: 'node_modules/**',
      presets: [ '@babel/preset-typescript', '@babel/preset-react' ],
      plugins: [
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-proposal-private-methods'
      ]
    }),
    external(),
    resolve(),
    terser()
  ],
  external: [ 'react', 'react-dom' ]
};

export default [
  {
    input: './src/index.ts',
    output: [
      {
        dir: 'dist/cjs',
        format: 'cjs'
      }
    ],
    ...commonConfig
  },
  {
    input: getInputFiles(),
    output: [
      {
        dir: 'dist/esm',
        format: 'es'
      }
    ],
    ...commonConfig
  }
];
