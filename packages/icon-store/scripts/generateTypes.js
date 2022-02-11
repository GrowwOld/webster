/**
 * This function generate typescript files usinga template string.
 * component folder paths: mi, custom (top level)
 * 
 * It will generate the .d.ts files for each component in the same folder.
 */


const { getDirContent, writeContentToFile } = require('./helpers/utils');

const chalk = require('chalk');
const { copyFileSync } = require('fs');


function generateTypesForIconComponent() {
    const componentFolderPaths = ['mi', 'custom'];

    componentFolderPaths.forEach(componentFolderPath => {
        console.log(chalk.green('Generating types for: ') + chalk.yellow(componentFolderPath));

        const components = getDirContent(componentFolderPath);

        components.forEach(component => {
            if (component.includes('index.js')) {
                copyFileSync(`${componentFolderPath}/index.js`, `${componentFolderPath}/index.d.ts`);
                return;
            }
            if (component.endsWith('.js')) {
                const componentName = component.slice(0, -3);

                const content = `import { ReactIconComponentType } from '../types';

declare const ${componentName}: ReactIconComponentType;
export default ${componentName};
            `

                const filePath = `${componentFolderPath}/${componentName}.d.ts`;
                writeContentToFile(filePath, content);
            }
        });

        console.log(chalk.gray('Finished.\n\n'));
    });
}

generateTypesForIconComponent();