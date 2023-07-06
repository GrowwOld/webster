import postcssModules from 'rollup-plugin-postcss-modules';
import postcssImport from 'postcss-import';
import copy from 'rollup-plugin-copy';


export default {
  input: './index.js', // Entry point of your application
  output: {
    file: './dist/bundle.css', // Output file
    format: 'cjs', // Output format (can be 'iife', 'umd', 'cjs', 'esm')
  },
  plugins: [
    postcssModules({
      plugins: [
        postcssImport(),
      ],
      extract: true,
      minimize: true,
      sourceMap: false,
      modules: true
    }),
    copy({
      targets: [
        {
          src: './typography/fonts/*.woff2',
          dest: 'dist/fonts'
        }, // Copy font files to the desired output directory
      ],
    })
  ],

};
