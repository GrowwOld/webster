/**
 * Only run this script if you need new MI svgs
 * or Google has update new icons in their github repo
 * 
 * THIS WILL OVERRIDE 'svgs/mi' FOLDER ICONS.
 * Command: node scripts/generateMaterialIcons.js
 * PS: Cloning from Google's git takes a while.
 */


const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { copyFile, normalizeFileName, getDirContent } = require('./helpers/utils');

const gitFolder = 'material-design-icons';
const srcFolder = 'src';
const materialIcons = 'materialicons';
const sizeName = '24px.svg'
const newMaterialSvgPath = 'mi/'

const updateFromGit = () => {
    if (fs.existsSync(gitFolder)) {
        console.log(chalk.green("Updating from Google's git..."));
        execSync('git pull', { cwd: gitFolder })
    }
    else {
        console.log(chalk.green("Cloning from Google's git..."));
        execSync(`git clone https://github.com/google/material-design-icons.git ${gitFolder}`)
    }
}


function copySvgsFromGit() {
    console.log(chalk.green('Copying svgs from Google\'s git...'));

    const materialIconsCategoryPath = path.join(gitFolder, srcFolder);
    const categoryFolders = getDirContent(materialIconsCategoryPath);

    for (let category of categoryFolders) {
        const categorySvgFolderPath = path.join(materialIconsCategoryPath, category);
        const svgFolders = getDirContent(categorySvgFolderPath);

        for (let svgFolder of svgFolders) {
            const svgFolderPath = path.join(categorySvgFolderPath, svgFolder);
            const inputFilePath = path.join(svgFolderPath, materialIcons, sizeName);
            const normalizedFileName = normalizeFileName(svgFolder);
            const outputFilePath = path.join('svgs', newMaterialSvgPath + normalizedFileName + '.svg');

            copyFile(inputFilePath, outputFilePath);
        }
    }

    console.log(chalk.gray('Done.\n\n'));
}

function getMaterialIconsFromGithubRepo() {
    updateFromGit();
    copySvgsFromGit();
}


getMaterialIconsFromGithubRepo();