const fs = require('fs');
const path = require('path');

async function createIndexFile(iconsType = 'mi', format="cjs"){
	const targetDirectory = `../${iconsType}`;
	const allFiles = fs.readdirSync(path.resolve(__dirname, targetDirectory));
	const indexFileContents = [];
	allFiles.forEach((s)=>{

		if(s.includes('index')) {
			return;
		}

		let fileContent = '';
		const componentName = s.split('.')[0];

		if(format === 'cjs') {
			fileContent = `exports.${componentName} = require('./cjs/${componentName}')`
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

}

createIndexFile('mi', 'cjs');
createIndexFile('mi', 'esm');
createIndexFile('custom', 'cjs');
createIndexFile('custom', 'esm');
