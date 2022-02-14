import { createRequire } from "module";
const require = createRequire(import.meta.url);

const rule = require('../../../lib/rules/prefer-type-alias');
const typescriptEslintParser = require.resolve("@typescript-eslint/parser")
const RuleTester = require('eslint').RuleTester;


const ruleTester = new RuleTester({
  parser: typescriptEslintParser
}
);

const errors = [ { message: 'Prefer type alias over interface' } ];


ruleTester.run('prefer-type-alias', rule, {

  valid: [
    {
      code: 'type A = { a: string }'
    }
  ],

  invalid: [
    {
      code: 'interface A { a: string; }',
      errors,
    },
  ],
})
