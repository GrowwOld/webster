function addNewLine(firstBlockEnd, secondBlockStart) {
  return secondBlockStart - firstBlockEnd === 1 ? '\n\n' : '\n'
}

module.exports = {
  meta: {
    docs: {
      description: 'Two line between class members',
    },
    fixable: 'whitespace',
  }
  ,
  create(context) {
    return {
      ClassBody(node) {
        const body = node.body;
        for (let i = 1; i < body.length; i++) {
          if (body[ i ].loc.start.line - body[ i - 1 ].loc.end.line < 3) {
            context.report({
              node,
              message: "Expected two lines between class members",
              loc: body[ i - 1 ].loc,
              fix(fixer) {
                return fixer.insertTextAfter(
                  body[ i - 1 ],
                  addNewLine(body[ i - 1 ].loc.end.line), body[ i ].loc.start.line)
              }
            });
          }
        }
      }
    }
  }
}
