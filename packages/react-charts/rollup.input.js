const fs = require('fs');

const fileTypes = [ '.ts', '.jsx', '.ts', '.tsx' ];


function getModulePaths(path) {
  const moduleList = fs.readdirSync(path);

  const modulePaths = [];

  moduleList.forEach((module) => {
    fileTypes.every((fileType) => {
      const componentPathCandidate = `${path}/${module}/index${fileType}`;

      if (fs.existsSync(componentPathCandidate)) {
        modulePaths.push(componentPathCandidate);
        return false; // break loop
      }

      return true; // continue loop
    });

  });

  return modulePaths;
}

export function getInputFiles() {
  return [
    './src/index.ts',
    ...getModulePaths('./src')
  ];
}
