// rule/ImportBlock.ts
const ImportBlock = class {
  constructor(importStatement) {
    this.importStatement = importStatement;
  }


  getNamedSpecifierString(specifier) {
    const imported = specifier.imported.name;
    const local = specifier.local.name;

    if (local !== imported) {
      return `${imported} as ${local}`;
    }

    return imported;
  }


  getCodeString() {
    const source = this.importStatement.source.value;
    const allSpecifiers = this.importStatement.specifiers;
    const defaultSpecifier = allSpecifiers.filter((spec) => spec.type === 'ImportDefaultSpecifier')[0];
    const namespaceSpecifier = allSpecifiers.filter((spec) => spec.type === 'ImportNamespaceSpecifier')[0];
    const allNamedSpecifiers = allSpecifiers.filter((spec) => spec.type === 'ImportSpecifier');
    const namedImportString = allNamedSpecifiers.reduce((final, spec, specIndex) => {
      if (specIndex === 0) {
        return final.concat(this.getNamedSpecifierString(spec));
      }

      return final.concat(', ', this.getNamedSpecifierString(spec));
    }, '');

    if (namespaceSpecifier) {
      return `import * as ${namespaceSpecifier.local.name} from '${source}';`;
    }

    if (defaultSpecifier && namedImportString) {
      return `import ${defaultSpecifier.local.name}, { ${namedImportString} } from '${source}';`;
    }

    if (namedImportString && !defaultSpecifier) {
      return `import { ${namedImportString} } from '${source}';`;
    }

    if (defaultSpecifier && !namedImportString) {
      return `import ${defaultSpecifier.local.name} from '${source}';`;
    }

    return `import '${source}';`;
  }
};

// rule/ImportSorter.ts
const ImportSorter = class {
  constructor(allImportStatments, customImportOrder) {
    /*
      * import groups are predefined patterns
      * they direct the spacing / new line between each group
      * there are certain default ones like
      * $library : all remaining imports that don't match the rest of the patterns
      * $css: all css ending imports
      * $images: all image imports
      * Custom ones can be specified using regex (they are ultimately 'tested' against the string)
    */
    this.defaultImportOrder = [
      '$library',
      '$css',
      '$img'
    ];
    this.isCustomGroup = (grp) => {
      return grp[0] !== '$';
    };

    this.allImportStatements = allImportStatments;
    if (customImportOrder) {
      this.importOrder = this.getFinalImportOrder(customImportOrder);

    } else {
      this.importOrder = this.defaultImportOrder;
    }
  }


  getFinalImportOrder(userPassedImportOrder) {
    const finalImportOrder = [ ...userPassedImportOrder ];

    if (!userPassedImportOrder.includes('$library')) {
      finalImportOrder.unshift('$library');
    }

    if (!userPassedImportOrder.includes('$css')) {
      finalImportOrder.push('$css');
    }

    if (!userPassedImportOrder.includes('$img')) {
      finalImportOrder.push('$img');
    }

    return finalImportOrder;
  }

  /*
    * @returns the array of grouped imports sources which have no new lines between.
    * Used for figuring out if the import order is correct or incorrect (code independent context reporting)
  */
  generateImportStmntsFormat() {
    const calculatedImportArrangement = [];
    let lastEnd = -1;
    let fillingIndex = 0;

    this.allImportStatements.forEach((node) => {
      const end = node.range[1];
      const start = node.range[0];

      if (lastEnd === -1) {
        calculatedImportArrangement[fillingIndex] = [ node.source.value ];

      } else {
        if (start - lastEnd > 1) {
          calculatedImportArrangement[++fillingIndex] = [ node.source.value ];

        } else {
          calculatedImportArrangement[fillingIndex].push(node.source.value);
        }
      }

      lastEnd = end;
    });
    return calculatedImportArrangement;
  }


  createInitializedImportGroups() {
    return this.importOrder.reduce((initializedGroups, group) => {
      initializedGroups[group] = {
        matcher: new RegExp(`${group}`, 'u'),
        groupName: group,
        imports: []
      };
      return initializedGroups;
    }, {});
  }


  findImportGroupForSource(source, groups) {
    const groupFound = [];
    const imageMatcher = new RegExp('.(jpe?g|png|svg|gif|mp3|mp4)$', 'u');
    const groupNames = Object.keys(groups);

    groupNames.every((grpName) => {
      const grp = groups[grpName];

      if (source.endsWith('.css')) {
        groupFound.push('$css');
      }

      if (imageMatcher.test(source)) {
        groupFound.push('$img');
      }

      const isMatchedCustomGroup = this.isCustomGroup(grp.groupName) && grp.matcher.test(source);

      if (isMatchedCustomGroup) {
        groupFound.push(grp.groupName);
      }

      return true;
    });
    if (groupFound.length === 0) {
      return '$library';

    } else {
      return groupFound.sort((a, b) => b.length - a.length)[0];
    }
  }

  /*
    * Transforms the sorted import data into an array of matched groups
    * This creates a visual structure using array inside array.
    * The innermost array represents a single group
    * Multiple such groups are combined to give out the final array
    * The final array has import groups that have a new line between each other.
    * @param groups (sorted import group) : ImportGroup
    * @param selector (optional selector) : what should be present in the array (could be source, importName etc)
    * @return array of import groups
  */
  generateSortedImportStmntsFormat(groups, selector) {
    const fallbackSelector = (imp) => imp.source.value;
    const selectorWithFallback = selector || fallbackSelector;

    return this.importOrder.map((importLbl) => {
      return groups[importLbl].imports.map(selectorWithFallback);
    }).filter((isDefined) => isDefined.length > 0);
  }


  performImportSorting() {
    const initializedImportGroups = this.createInitializedImportGroups();

    this.sortedImportGroups = this.allImportStatements.reduce((impGroup, imp) => {
      const source = imp.source.value;
      const groupForImport = this.findImportGroupForSource(source, initializedImportGroups);

      impGroup[groupForImport].imports.push(imp);
      return impGroup;
    }, initializedImportGroups);
    return this.generateSortedImportStmntsFormat(this.sortedImportGroups);
  }


  getSortedImportRawText() {
    const sortedImportNodeGroup = this.generateSortedImportStmntsFormat(this.sortedImportGroups, (imp) => imp);

    return sortedImportNodeGroup.map((grp) => {
      return grp.map((singleImport) => {
        const importBlock = new ImportBlock(singleImport);
        const string = importBlock.getCodeString();

        return string;
      }).join('\n');
    }).join('\n\n');
  }
};

// rule/utils.ts
const flattenArrayToOneString = (arr) => {
  return arr.map((v) => v.join(''));
};


const isValidImportOrder = (oldOrder, newOrder) => {
  if (oldOrder.length !== newOrder.length) {
    return false;
  }

  const flatOldOrder = flattenArrayToOneString(oldOrder);
  const flatNewOrder = flattenArrayToOneString(newOrder);

  flatOldOrder.forEach((oldEl, index) => {
    if (oldEl !== flatNewOrder[index]) { return false; }
  });
  return true;
};

// rule/index.ts
const meta = {
  type: 'layout',
  docs: {
    description: 'Sort imports in an order specified by an array of matches'
  },
  hasSuggestions: true,
  fixable: 'whitespace',
  schema: {
    order: {
      type: 'array',
      items: {
        type: 'string'
      }
    }
  }
};


function getUserPassedOrder(options) {
  if (!options) { return; }

  if (options[0]) {
    if (options[0].order) {
      return options[0].order;
    }
  }

  return;
}


function create(context) {
  return {
    Program(node) {
      const allImportStatements = node.body.filter((imp) => imp.type === 'ImportDeclaration');

      if (allImportStatements.length === 0) {
        return;
      }

      const customPassedOrder = getUserPassedOrder(context.options);
      const importSorter = new ImportSorter(allImportStatements, customPassedOrder);
      const oldOrder = importSorter.generateImportStmntsFormat();
      const newOrder = importSorter.performImportSorting();

      if (!isValidImportOrder(oldOrder, newOrder)) {
        const rawLintedImportText = importSorter.getSortedImportRawText();
        const firstImportNode = allImportStatements[0];
        const lastImportNode = allImportStatements[allImportStatements.length - 1];

        context.report({
          node: firstImportNode,
          message: 'Invalid Import Order',
          fix(fixer) {
            return fixer.replaceTextRange([
              firstImportNode.range[0],
              lastImportNode.range[1]
            ], rawLintedImportText);
          }
        });
      }
    }
  };
}

module.exports = {
  create,
  meta
}
