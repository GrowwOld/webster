import { createRequire } from 'module';

const require = createRequire(import.meta.url);

const rule = require('../../../lib/rules/two-line-between-class-members');
const typescriptEslintParser = require.resolve("@typescript-eslint/parser")
const RuleTester = require('eslint').RuleTester;


const ruleTester = new RuleTester({
  parser: typescriptEslintParser
}
);

const errors = [ { message: 'Expected two lines between class members' } ];


ruleTester.run('two-line-between-class-members', rule, {

  valid: [
    {
      code: 'class C{\na(){}\n\n\nb(){}\n}'
    }
  ],

  invalid: [
    {
      code: 'class C{\na(){}\n\nb(){}\n}',
      output: 'class C{\na(){}\n\n\nb(){}\n}',
      errors,
    },
  ],
})
