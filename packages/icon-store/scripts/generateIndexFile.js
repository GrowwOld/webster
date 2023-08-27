const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

const handleDefaultPropsFileContent = {
	cjs: `
	function handleDefaultProps(oldProps){
		return {
			...(oldProps.custom ? {} : { viewBox: '0 0 24 24', fill: 'currentColor', height: 24, width: 24}),
			...(oldProps.size ? {height: oldProps.size, width: oldProps.size} : {}),
			...oldProps,
			size: undefined,
			custom: undefined
	};
	}

	module.exports = {handleDefaultProps}
	`,
	esm: `
	export function handleDefaultProps(oldProps){
		return {
			...(oldProps.custom ? {} : { viewBox: '0 0 24 24', fill: 'currentColor', height: 24, width: 24}),
			...(oldProps.size ? {height: oldProps.size, width: oldProps.size} : {}),
			...oldProps,
			size: undefined,
			custom: undefined
		};
	}
	`
}

async function createIndexFile(iconsType = 'mi', format="cjs"){
	const targetDirectory = `../${iconsType}`;
	const allFiles = fs.readdirSync(path.resolve(__dirname, targetDirectory, format));
	const indexFileContents = [];

	console.log(chalk.green('Generating index reexports for ', iconsType, ' ') + chalk.yellow(format.toUpperCase()));

	allFiles.forEach((s)=>{

		if(s.includes('index')) {
			return;
		}

		let fileContent = '';
		const componentName = s.split('.')[0];

		if(format === 'cjs') {
			fileContent = `exports.${componentName} = require('./cjs/${componentName}').default`
		}
		else {
			fileContent = `export { default as ${componentName} } from './esm/${componentName}'`
		}

		indexFileContents.push(fileContent);

	})

	if(format === 'cjs') {
		fs.writeFileSync(path.resolve(__dirname, targetDirectory ,'index.js'), indexFileContents.join('\n'))
	}
	else {
		fs.writeFileSync(path.resolve(__dirname, targetDirectory ,'index.esm.js'), indexFileContents.join('\n'))
	}

	fs.writeFileSync(path.resolve(__dirname, targetDirectory, format, 'utils.js'), handleDefaultPropsFileContent[format])


	console.log(chalk.grey('Completed'));

}

createIndexFile('mi', 'cjs');
createIndexFile('mi', 'esm');
createIndexFile('custom', 'cjs');
createIndexFile('custom', 'esm');
