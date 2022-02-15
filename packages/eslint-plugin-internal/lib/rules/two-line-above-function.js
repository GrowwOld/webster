function addNewLine(firstBlockEnd, secondBlockStart) {
  return secondBlockStart - firstBlockEnd === 1 ? '\n\n' : '\n'
}

function isArrowFunction(node) {
  return node.type === "VariableDeclaration" && node.declarations && node.declarations[0] && node.declarations[0].init &&
    node.declarations[0].init.type === 'ArrowFunctionExpression';
}

function isFunctionDeclaration(node) {
  return node.type === 'FunctionDeclaration';
}

function isTypeAliasDeclaration(node){
  return node.type === 'TSTypeAliasDeclaration';
}

module.exports = {
  meta: {
    docs: {
      description: 'Expected two line above',
    },
    fixable: 'whitespace',
  },

  create(context) {
    function checkTwoline(node) {
      const body = node.body;
      for (let i = 1; i < body.length; i++) {
        const currentNode = body[i];
        if ((isArrowFunction(currentNode) || isFunctionDeclaration(currentNode) || isTypeAliasDeclaration(currentNode)) && body[i].loc.start.line - body[i - 1].loc.end.line < 3) {
          context.report({
            node,
            message: "Expected two line above",
            loc: body[i].loc,
            fix(fixer) {
              return fixer.insertTextAfter(body[i - 1], addNewLine(body[i - 1].loc.end.line, body[i].loc.start.line));
            }
          });
        }
      }
    }

    return {
      Program(node) {
        checkTwoline(node);
      },
      BlockStatement(node) {
        checkTwoline(node);
      }
    };
  }
};
