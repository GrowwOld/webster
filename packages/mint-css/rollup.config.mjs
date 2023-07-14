import postcssModules from 'rollup-plugin-postcss';
import postcssImport from 'postcss-import';
import copy from 'rollup-plugin-copy';

export default {
  input: './index.css', // Entry point of your application
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
      loaders: [
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: 'url-loader',
        },
      ],
    }),
    copy({
      targets: [
        { src: './typography/fonts/*.woff2', dest: 'dist' }, // Copy font files to the desired output directory
      ],
      after: [
        {
          src: 'dist/bundle.css',
          dest: 'dist',
          transform: (contents) => {
            // Modify the font paths in the CSS file
            const modifiedContents = contents.toString().replace(/url\(fonts\//g, 'url(dist/fonts/');
            return modifiedContents;
          },
        },
      ],
    }),
  ],

};
