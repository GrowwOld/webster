/**
 * This function will transform the component files of mi and custom icons
 * using babel transfromSync and minify the result using terser's api.
 */


const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk')

const timeoutId = setTimeout(()=>{
	console.log('timeout occurred')
}, 10000)

function compileReactComponentsUsingBabel() {
    const miComponentPath = path.join(__dirname, '../mi');
    const customComponentPath = path.join(__dirname, '../custom');

    [miComponentPath, customComponentPath].forEach(function (componentPath) {
        console.log(chalk.green('Compiling resources from: ') + chalk.yellow(componentPath));
        const componentFiles = fs.readdirSync(componentPath);
        componentFiles.forEach(async file => {
            if (file.endsWith('.js') && !file.includes('index.js')) {

                const filePath = path.join(componentPath, file);

							const transformed = await esbuild.build({
								entryPoints: [filePath],
								outfile: filePath,
								banner: {
									"js": "var React = require('react');"
								},
								allowOverwrite: true,
								format: 'cjs',
								jsx: 'transform',
								minify: true,
								loader: {
									'.js': 'jsx'
								}
							});

							if(componentPath === customComponentPath) {
								clearTimeout(timeoutId);
							}
            }
        });

        console.log(chalk.gray('Completed\n\n'))
    });
}

compileReactComponentsUsingBabel();
