import postcss from 'rollup-plugin-postcss';
import postcssImport from 'postcss-import';
import copy from 'rollup-plugin-copy';

export default {
  input: './index.css',
  output: {
    file: './dist/index.css', // Output file
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
        { src: './typography/fonts/*.woff2', dest: 'dist' }, // Copy font files to the desired output directory
      ],
      after: [
        {
          src: 'dist/index.css',
          dest: 'dist'
        },
      ],
    }),
  ],

};
