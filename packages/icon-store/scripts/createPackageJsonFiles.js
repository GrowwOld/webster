const fs = require('fs');
const path = require('path');

function createPackageJson(iconType="mi"){
	fs.writeFileSync(path.resolve(__dirname, `../${iconType}`, 'package.json'), `{
		"sideEffects": false,
		"module": "./index.esm.js",
		"main": "./index.js"
	}`)
}

createPackageJson('mi');
createPackageJson('custom');
