import { createRequire } from 'module';

const require = createRequire(import.meta.url);

const rule = require('../../../lib/rules/two-line-above-function');
const typescriptEslintParser = require.resolve("@typescript-eslint/parser")
const RuleTester = require('eslint').RuleTester;


const ruleTester = new RuleTester({
  parser: typescriptEslintParser
}
);

const errors = [{ message: 'Expected two line above' }];


ruleTester.run('two-line-above-function', rule, {

  valid: [
    {
      code: 'function C(){\nfunction a(){};\n\n\nfunction b(){};\n};'
    },
    {
      code: 'function C(){\nfunction a(){};\n\n\nfunction b(){};\n};\n\n\nfunction foo(){};'
    },
    {

      code: 'function C(){\nfunction a(){};\n\n\nfunction b(){};\n};\n\n\ntype pay={a:string;};'
    }
  ],

  invalid: [
    {
      code: 'function C(){\nfunction a(){}\n\nfunction b(){}\n}',
      output: 'function C(){\nfunction a(){}\n\n\nfunction b(){}\n}',
      errors,
    },
    {
      code: 'const c=()=>{\nfunction a(){}\nconst b=()=>{const x=1}\n}',
      output: 'const c=()=>{\nfunction a(){}\n\n\nconst b=()=>{const x=1}\n}',
      errors,
    },
    {
      code: 'function C(){\nfunction a(){}\ntype pay={a:string;}\n}',
      output: 'function C(){\nfunction a(){}\n\n\ntype pay={a:string;}\n}',
      errors,
    },
  ],
})
