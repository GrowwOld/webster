/**
 * Template for the icon component, used by svgr package.
 */

function defaultTemplate(
  { template },
  opts,
  { imports, componentName, jsx },
) {
  const plugins = ['jsx']
  const jsTemplate = template.smart({ plugins })
  const componentRealName = componentName.name?.replace('Svg', '');

  return jsTemplate.ast`import React from 'react';
  
  function ${componentRealName}(oldProps) {    
    const props = {
      ...(oldProps.custom ? {} : { viewBox: '0 0 24 24', fill: 'currentColor', height: 24, width: 24}),
      ...(oldProps.size ? {height: oldProps.size, width: oldProps.size} : {}),
      ...oldProps,
      size: undefined,
      custom: undefined
    };

    return ${jsx}
  }
  
  export default React.memo(${componentRealName});
    `
}

module.exports = defaultTemplate