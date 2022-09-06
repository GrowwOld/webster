const { elementType, hasProp } = require('jsx-ast-utils');

const IMAGE_ELEMENTS = ['img', 'Image'];

module.exports = {
  meta: {
    docs: {
      description: 'Forbid image element without explicit height and width attributes',
    }
  },

  create(context) {
    return {
      JSXOpeningElement: (node) => {
        const tagName = elementType(node);
        if (!IMAGE_ELEMENTS.includes(tagName)) return;

        const width = hasProp(node.attributes, 'width');
        const height = hasProp(node.attributes, 'height');

        if (width === false) {
          context.report({
            node,
            message: 'Missing an explicit `width` prop for image element',
          });
        }
        if (height === false) {
          context.report({
            node,
            message: 'Missing an explicit `height` prop for image element',
          });
        }
      },
    };
  },
};
