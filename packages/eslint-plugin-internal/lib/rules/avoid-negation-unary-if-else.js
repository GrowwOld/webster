module.exports = {
  meta: {
    docs: {
      description: 'Avoid negation unary if else',
    }
  }
  ,
  create(context) {
    return {
      IfStatement(node) {
        if (node.consequent && node.alternate && !node.alternate.consequent) {
          if (node.test.type === "UnaryExpression" && node.test.operator === "!") {
            context.report({
              node,
              message: "Not expected negation here",
              loc: node.loc,
            });
          }
        }
      }
    }
  }
}
