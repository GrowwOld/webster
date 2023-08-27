const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

function createPackageJson(iconType="mi"){
	console.log(chalk.green('Generating package json for ') + chalk.yellow(iconType));

	fs.writeFileSync(path.resolve(__dirname, `../${iconType}`, 'package.json'), `{
		"sideEffects": false,
		"module": "./index.esm.js",
		"main": "./index.js"
	}`)

	console.log(chalk.grey('Completed'));
}

createPackageJson('mi');
createPackageJson('custom');
