import { createRequire } from 'module';

const require = createRequire(import.meta.url);

const rule = require('../../../lib/rules/require-height-width-attribute');
const typescriptEslintParser = require.resolve("@typescript-eslint/parser")
const RuleTester = require('eslint').RuleTester;


const ruleTester = new RuleTester({
  parser: typescriptEslintParser,
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  }
}
);

const errors = [{ message: 'Missing an explicit `width` prop for image element' }, { message: 'Missing an explicit `height` prop for image element' }];
const heightError = [errors[1]];
const widthError = [errors[0]];


ruleTester.run('require-height-width-attributes', rule, {

  valid: [
    {
      code: '<img width="100" height="100" />'
    },
    {
      code: '<Image width="100%" height="50px" />'
    }
  ],

  invalid: [
    {
      code: '<img />',
      errors,
    },
    {
      code: '<Image />',
      errors,
    },
    {
      code: '<img width="100" />',
      errors: heightError,
    },
    {
      code: '<Image height="100%" />',
      errors: widthError,
    }
  ],
})
