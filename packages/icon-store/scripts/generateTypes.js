/**
 * This function generate typescript files usinga template string.
 * component folder paths: mi, custom (top level)
 * 
 * It will generate the .d.ts files for each component in the same folder.
 */


 const { getDirContent, writeContentToFile } = require('./helpers/utils');

 const chalk = require('chalk');
 

 function generateTypesForIconComponent() {
     const componentFolderPaths = ['mi', 'custom'];
 
     componentFolderPaths.forEach(componentFolderPath => {
         console.log(chalk.green('Generating types for: ') + chalk.yellow(componentFolderPath));
 
         const components = getDirContent(componentFolderPath);
         
         const allComponentTypeLines = [`import {ReactIconComponentType} from "../types"`];
         
         const declarationPath = `${componentFolderPath}/index.d.ts`;
 
         components.forEach(component => {
 
             if(component.includes('.js')){
                 
                 const componentName = component.slice(0 , -3);
                 const contentForComponent = `export var ${componentName}: ReactIconComponentType;`
                 
                 allComponentTypeLines.push(contentForComponent);

                const content = `import { ReactIconComponentType } from '../types';

declare const ${componentName}: ReactIconComponentType;
export default ${componentName};
                `

                const componentDeclarationFilePath = `${componentFolderPath}/${componentName}.d.ts`;
                writeContentToFile(componentDeclarationFilePath, content);
             }
             
         });
 
         writeContentToFile(declarationPath , allComponentTypeLines.join('\n'));
 
         console.log(chalk.gray('Finished.\n\n'));
     });
 }
 
 generateTypesForIconComponent();