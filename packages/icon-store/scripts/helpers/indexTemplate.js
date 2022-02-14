const path = require('path')

function defaultIndexTemplate(filePaths) {
    const filePathInLowerCase = filePaths.map(filePath => filePath.toLowerCase());
    const uniqueFilePaths = filePaths.filter((filePath, index) => {
        return filePathInLowerCase.indexOf(filePath.toLowerCase()) === index
    })

    const exportEntries = uniqueFilePaths.map((filePath) => {
        const basename = path.basename(filePath, path.extname(filePath))
        const exportName = /^\d/.test(basename) ? `Material${basename}` : basename
        return `export { default as ${exportName} } from './${basename}'`
    })
    return exportEntries.join('\n')
}

module.exports = defaultIndexTemplate