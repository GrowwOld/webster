import { createRequire } from "module";
const require = createRequire(import.meta.url);

const rule = require('../../../lib/rules/avoid-negation-unary-if-else');
const typescriptEslintParser = require.resolve("@typescript-eslint/parser")
const RuleTester = require('eslint').RuleTester;


const ruleTester = new RuleTester({
  parser: typescriptEslintParser
}
);

const errors = [ { message: 'Not expected negation here' } ];


ruleTester.run('avoid-negation-unary-if-else', rule, {

  valid: [
    {
      code: 'const a=2;if(a){}else{}'
    }
  ],

  invalid: [
    {
      code: 'const a=1; if(!a){}else{}',
      errors,
    },
  ],
})
