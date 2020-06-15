const { getAbsolutePathList, getFileNameList } = require('../main');
const path = require('path');
const util = require('util');
const childProcess = require('child_process');
const exec = util.promisify(childProcess.exec);
const assert = require('assert');

describe('main.js', () => {
  const errorIvalidDirectoryPathText = 'Invalid directory path';

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

    it('If you specify a directory where the file does not exist, empty array will be returned', async () => {
      const targetPath = path.join(
        __dirname,
        'testdata',
        'non_file_exists_dir'
      );

      const emptyArr = await getAbsolutePathList(targetPath);

      assert.ok(Array.isArray(emptyArr));
    });

    it('If no argument is given, an error is throw', async () => {
      const fileList = await getAbsolutePathList().catch((e) => {
        assert.equal(e.message, errorIvalidDirectoryPathText);
      });
    });

    it('If no provide a directory path, an error is throw', async () => {
      const targetPath = path.join(__dirname, 'testdata', 'dir1', 'test1.txt');
      const fileList = await getAbsolutePathList(targetPath).catch((e) => {
        assert.equal(e.message, errorIvalidDirectoryPathText);
      });
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

    it('If you specify a directory where the file does not exist, empty array will be returned', async () => {
      const targetPath = path.join(
        __dirname,
        'testdata',
        'non_file_exists_dir'
      );

      const emptyArr = await getFileNameList(targetPath);

      assert.ok(Array.isArray(emptyArr));
    });

    it('If no argument is given, an error is throw', async () => {
      const fileList = await getAbsolutePathList().catch((e) => {
        assert.equal(e.message, errorIvalidDirectoryPathText);
      });
    });

    it('If no provide a directory path, an error is throw', async () => {
      const targetPath = path.join(__dirname, 'testdata', 'dir1', 'test1.txt');
      const fileList = await getAbsolutePathList(targetPath).catch((e) => {
        assert.equal(e.message, errorIvalidDirectoryPathText);
      });
    });
  });
});
