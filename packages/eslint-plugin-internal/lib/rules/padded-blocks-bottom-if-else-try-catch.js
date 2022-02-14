module.exports = {
  meta: {
    docs: {
      description: 'Bottom padding in if else statements',
    },
    fixable: 'whitespace',
  }
  ,
  create(context) {
    return {
      IfStatement(node) {
        if (node.consequent && node.alternate && node.consequent.body) {
          const consequentBody = node.consequent.body;
          if (
            consequentBody.length && 
            node.consequent.loc.end.line - consequentBody[ consequentBody.length - 1 ].loc.end.line < 2
          ) {
            context.report({
              node,
              message: "Expected bottom padding",
              loc: consequentBody[ consequentBody.length - 1 ].loc,
              fix(fixer) {
                return fixer.insertTextAfter(consequentBody[ consequentBody.length - 1 ], "\n")
              }
            });
          }
        }
      },
      TryStatement(node) {
        const tryBlock = node.block;
        if (
          tryBlock.body.length &&
          tryBlock.loc.end.line - tryBlock.body[ tryBlock.body.length - 1 ].loc.end.line < 2
        ) {
          context.report({
            node,
            message: "Expected bottom padding",
            loc: tryBlock.body[ 0 ].loc,
            fix(fixer) {
              return fixer.insertTextAfter(tryBlock.body[ tryBlock.body.length - 1 ], "\n")
            }
          });
        }
      }
    };
  }
};
