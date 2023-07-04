import postcss from 'rollup-plugin-postcss';
import postcssImport from 'postcss-import';

export default {
  input: './index.js', // Entry point of your application
  output: {
    file: './dist/bundle.css', // Output file
    // format: 'iife', // Output format (can be 'iife', 'umd', 'cjs', 'esm')
  },
  plugins: [
    postcss({
      plugins: [
        postcssImport(), // Add the CSS minifier plugin
      ],
      extract: true,
      minimize: true,
      sourceMap: false,
    }),
  ],

};
