import { createRequire } from "module";
const require = createRequire(import.meta.url);

const rule = require('../../../lib/rules/padded-blocks-bottom-if-else-try-catch');

const RuleTester = require('eslint').RuleTester;


const ruleTester = new RuleTester();

const errors = [ { message: 'Expected bottom padding' } ];


ruleTester.run('padded-blocks-bottom', rule, {

  valid: [
    {
      code: 'if(a){\nalert("Hi");\n\n}else{\nalert("Hello");\n}'
    },
    {
      code: 'if(a){\nalert("Hi");\n\n}else if(b){\nalert("Hello");\n\n}else{\nalert("Byee");\n}'
    },
    {
      code: 'try{\nalert("Hi");\n\n}catch(e){\n alert("Byee");\n}'
    },
    {
      code: 'if(a){\n}else{\n}'
    }
  ],

  invalid: [
    {
      code: 'if(a){\nalert("Hi");\n}else{\nalert("Hello");\n}',
      output: 'if(a){\nalert("Hi");\n\n}else{\nalert("Hello");\n}',
      errors,
    },
    {
      code: `if(a){\nalert("Hi");\n}else if(b){\nalert("Hello");\n\n}else{\nalert("Byee");\n}`,
      output: `if(a){\nalert("Hi");\n\n}else if(b){\nalert("Hello");\n\n}else{\nalert("Byee");\n}`,
      errors,
    },
    {
      code: `if(a){\nalert("Hi");\n\n}else if(b){\nalert("Hello");\n\}else{\nalert("Byee");\n}`,
      output: `if(a){\nalert("Hi");\n\n}else if(b){\nalert("Hello");\n\n}else{\nalert("Byee");\n}`,
      errors,
    },
    {
      code: 'try{\nalert("Hi");\n}catch(e){\n alert("Byee");\n}',
      output: 'try{\nalert("Hi");\n\n}catch(e){\n alert("Byee");\n}',
      errors
    }
  ],
})
