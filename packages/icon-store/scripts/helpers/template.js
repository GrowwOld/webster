const customTemplate = (
  { imports, interfaces, componentName, props, jsx, exports },
  { tpl },
) => {

  const componentRealName = componentName?.replace('Svg', '');

  return tpl`
${interfaces}

export function ${componentRealName}(oldProps) {    
   const props = handleDefaultProps(oldProps);

    return ${jsx}
  }

  `
}

module.exports = customTemplate;
