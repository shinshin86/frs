const fs = require('fs').promises;
const path = require('path');

const getAbsolutePathList = async (targetPath) => {
  const fileList = [];
  const fileNameOnly = false;
  return await search(targetPath, fileList, getAbsolutePathList, fileNameOnly);
};

const getFileNameList = async (targetPath) => {
  const fileList = [];
  const fileNameOnly = true;
  return await search(targetPath, fileList, getFileNameList, fileNameOnly);
};

const search = async (targetPath, fileList, searchFunc, fileNameOnly) => {
  const getFilePathText = fileNameOnly ? path.basename : (filepath) => filepath;

  const files = await fs.readdir(targetPath);
  for (const f of files) {
    const filePath = path.join(targetPath, f);

    const searchPath = path.join(targetPath, f);
    const stats = await fs.stat(searchPath);
    if (stats.isDirectory()) {
      const resultList = await searchFunc(searchPath, fileList);
      fileList = fileList.concat(resultList);
    } else {
      fileList.push(getFilePathText(filePath));
    }
  }

  return fileList;
};

module.exports = {
  getAbsolutePathList,
  getFileNameList,
};
