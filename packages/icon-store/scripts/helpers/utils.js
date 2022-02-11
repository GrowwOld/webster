const fs = require('fs');
const path = require('path');


function getDirContent(path) {
    if (fs.existsSync(path)) {
        return fs.readdirSync(path);
    }
    return [];
};

function writeContentToFile(inputPath, fileContent) {
    if (inputPath && fileContent) {
        return fs.writeFileSync(inputPath, fileContent);
    }
}

function copyFile(source, target) {
    if(!fs.existsSync(source)){
        return;
    }
    const targetDir = path.dirname(target);
    if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir);
    }
    fs.writeFileSync(target, fs.readFileSync(source));
};


function normalizeFileName(name) {
    const startsWithNumberRegex = /^\d/;

    try {
        if (startsWithNumberRegex.test(name)) {
            name = `material_${name}`
        }

        return name;
    } catch (e) {
        console.log(e);
        return name;
    }
}

module.exports = {
    copyFile,
    getDirContent,
    writeContentToFile,
    normalizeFileName
};
