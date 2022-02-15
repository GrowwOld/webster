/**
 * This function will transform the component files of mi and custom icons
 * using babel transfromSync and minify the result using terser's api.
 */


const babel = require('@babel/core');
const fs = require('fs');
const path = require('path');
const { minify } = require("terser");
const chalk = require('chalk')

const babelConfig = {
    presets: [
        ['@babel/preset-env', {
            "targets": {
                "node": "current",
                "browsers": [
                    ">1%",
                    "not ie 11"
                ]
            },
            "loose": true,
            "bugfixes": true,
            "forceAllTransforms": true,
            "corejs": 3,
            "useBuiltIns": "entry"
        }],
        '@babel/preset-react'
    ],
    plugins: ['@babel/plugin-transform-runtime'],
}



function compileReactComponentsUsingBabel() {
    const miComponentPath = path.join(__dirname, '../mi');
    const customComponentPath = path.join(__dirname, '../custom');

    [miComponentPath, customComponentPath].forEach(function (componentPath) {
        console.log(chalk.green('Compiling resources from: ') + chalk.yellow(componentPath));
        const componentFiles = fs.readdirSync(componentPath);
        componentFiles.forEach(file => {
            if (file.endsWith('.js') && !file.includes('index.js')) {

                const filePath = path.join(componentPath, file);
                const fileContents = fs.readFileSync(filePath, 'utf8');

                const transformed = babel.transformSync(fileContents, babelConfig);

                minify(transformed.code).then(result => {
                    fs.writeFileSync(filePath, result.code);
                }).catch(err => {
                    console.error(err)
                });
            }
        });

        console.log(chalk.gray('Completed\n\n'))
    });
}

compileReactComponentsUsingBabel();