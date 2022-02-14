module.exports = {
  meta: {
    docs: {
      description: 'Prefer type alias over interface',
    }
  }
  ,
  create(context) {
    return {
      TSInterfaceDeclaration: (node) => {
        context.report({
          node: node.id,
          message: "Prefer type alias over interface"
        })
      }
    }
  }
}
