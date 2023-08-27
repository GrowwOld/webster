const customTemplate = (
  { imports, interfaces, componentName, props, jsx, exports },
  { tpl }
) => {
  const componentRealName = componentName?.replace("Svg", "");

  return tpl`
import {handleDefaultProps} from './utils';

function ${componentRealName}(oldProps) {    
   const props = handleDefaultProps(oldProps);

    return ${jsx}
  }

	export default React.memo(${componentRealName});

  `;
};

module.exports = customTemplate;
