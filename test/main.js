const { getAbsolutePathList, getFileNameList } = require('../main');
const path = require('path');
const util = require('util');
const childProcess = require('child_process');
const exec = util.promisify(childProcess.exec);
const assert = require('assert');

describe('main.js', () => {
  describe('getAbsolutePathList', () => {
    it('Get a list of absolute paths under the specified directory', async () => {
      const targetPath = path.join(__dirname, 'testdata');

      const { stdout } = await exec(`find ${targetPath} -type f`);
      const findList = stdout.split('\n').filter((r) => r);

      const fileList = await getAbsolutePathList(targetPath);

      assert.equal(fileList.length, findList.length);

      for (const file of fileList) {
        assert.ok(findList.includes(file));
      }
    });
  });

  describe('getFileNameList', () => {
    it('Get a list of file name under the specified directory', async () => {
      const targetPath = path.join(__dirname, 'testdata');

      const { stdout } = await exec(`find ${targetPath} -type f`);
      const findList = stdout.split('\n').filter((r) => r);

      const fileNameList = findList.map((filePath) => {
        const lastIndex = filePath.split('/').length;
        return filePath.split('/')[lastIndex - 1];
      });

      const fileList = await getFileNameList(targetPath);

      assert.equal(fileList.length, fileNameList.length);

      for (const file of fileList) {
        assert.ok(fileNameList.includes(file));
      }
    });
  });
});
