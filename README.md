# frs

![frs logo image](./images/frs_logo.png)

npm library for file recursive search

(This repository is a WIP)

[![Build Status](https://travis-ci.org/shinshin86/frs.svg?branch=master)](https://travis-ci.org/shinshin86/frs)

## Usage

Both functions return Promise.

```javascript
const { getAbsolutePathList, getFileNameList } = require('frs');

(async () => {
  const absolutePathList = await getAbsolutePathList('./testdata');
  console.log({ absolutePathList });

  const fileNameList = await getFileNameList('./testdata');
  console.log({ fileNameList });
})();
```

↓

```bash
{
  absolutePathList: [
    'testdata/dir1/dir2/test2.txt',
    'testdata/dir1/dir2/test6.txt',
    'testdata/dir1/dir3/dir4/dir5/dir6/test8.txt',
    'testdata/dir1/dir3/dir4/dir5/dir6/test9.txt',
    'testdata/dir1/dir3/dir4/dir5/test7.txt',
    'testdata/dir1/dir3/dir4/test5.txt',
    'testdata/dir1/dir3/test3.txt',
    'testdata/dir1/dir3/test4.txt',
    'testdata/dir1/test1.txt'
  ]
}
{
  fileNameList: [
    'test2.txt', 'test6.txt',
    'test8.txt', 'test9.txt',
    'test7.txt', 'test5.txt',
    'test3.txt', 'test4.txt',
    'test1.txt'
  ]
}
```

## Install

```bash
npm install frs
# or
yarn add frs
```

## Command

Test

```bash
npm run test
```

Code Format

```bash
npm run fmt
```
