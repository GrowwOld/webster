import postcss from 'rollup-plugin-postcss';
import postcssImport from 'postcss-import';
import copy from 'rollup-plugin-copy';


export default {
  input: './index.css', // Entry point of your application
  output: {
    file: './dist/bundle.css', // Output file
    format: 'cjs', // Output format (can be 'iife', 'umd', 'cjs', 'esm')
  },
  plugins: [
    postcss({
      plugins: [
        postcssImport(),
      ],
      extract: true,
      minimize: true,
      sourceMap: false
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
