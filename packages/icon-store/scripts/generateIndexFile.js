const fs = require('fs');
const path = require('path');
const esbuild = require('esbuild');

const timeoutId = setTimeout(()=>{
	console.log('timed out');
}, 100000)

async function createIndexFile(iconsType = 'mi'){
	const targetDirectory = `../${iconsType}`;
	const allFiles = fs.readdirSync(path.resolve(__dirname, targetDirectory));
	const indexFileContents = [`
		
		function handleDefaultProps(oldProps){
			return {
				...(oldProps.custom ? {} : { viewBox: '0 0 24 24', fill: 'currentColor', height: 24, width: 24}),
				...(oldProps.size ? {height: oldProps.size, width: oldProps.size} : {}),
				...oldProps,
				size: undefined,
				custom: undefined
			};
		}

		`];
	allFiles.forEach((s)=>{

		if(s.includes('index')) {
			return;
		}

		const fileContent = fs.readFileSync(path.resolve(__dirname, targetDirectory, s), {
			encoding: 'utf-8'
		})
		indexFileContents.push(fileContent);
	})
	
	fs.writeFileSync(path.resolve(__dirname, targetDirectory ,'index.temp.js'), indexFileContents.join('\n'))

	await esbuild.build({
		entryPoints: [path.resolve(__dirname, targetDirectory, 'index.temp.js')],
		bundle: true,
		minify: true,
		jsx: "automatic",	
		format: 'esm',
		loader: { '.js': 'jsx' },
		banner: {
			js: 'import React from \'react\';'
		},
		outfile: path.resolve(__dirname, targetDirectory, 'index.esm.js'),
	})

	await esbuild.build({
		entryPoints: [path.resolve(__dirname, targetDirectory, 'index.temp.js')],
		bundle: true,
		minify: true,
		jsx: "automatic",	
		loader: { '.js': 'jsx' },
		format: 'cjs',
		banner: {
			js: 'const React = require(\'react\');'
		},
		outfile: path.resolve(__dirname, targetDirectory, 'index.js'),
	})

	clearTimeout(timeoutId);

}


createIndexFile('mi');
createIndexFile('custom');
