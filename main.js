const fs = require('fs').promises;
const path = require('path');

const getAbsolutePathList = async (targetPath) => {
  const fileList = [];
  return await search(targetPath, fileList, getAbsolutePathList);
};

const search = async (targetPath, fileList, searchFunc) => {
  const files = await fs.readdir(targetPath);
  for (const f of files) {
    const filePath = path.join(targetPath, f);

    const searchPath = path.join(targetPath, f);
    const stats = await fs.stat(searchPath);
    if (stats.isDirectory()) {
      const resultList = await searchFunc(searchPath, fileList);
      fileList = fileList.concat(resultList);
    } else {
      fileList.push(filePath);
    }
  }

  return fileList;
};

module.exports = {
  getAbsolutePathList,
};
