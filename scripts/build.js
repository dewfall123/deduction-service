const chokidar = require('chokidar');
const globby = require('globby');
const fsExtra = require('fs-extra');
const minimist = require('minimist');
const path = require('path');

const { copyOrCompile } = require('./util');

const argv = minimist(process.argv.slice(2));

const srcFiles = [
  // 编译复制这三种代码文件
  'src/**/*.less',
  'src/**/*.json',
  'src/**/*.wxml',
  // 复制资源
  'src/**/*.svg',
  'src/**/*.png',
  '!src/tsconfig.json',
];

// 监听模式
if (argv.w) {
  chokidar
    .watch(srcFiles)
    .on('change', (file) => copyOrCompile(file))
    .on('add', (file) => copyOrCompile(file))
    .on('unlink', (file) => fsExtra.remove(file));
  console.log('监听中...');
} else {
  // 只编译一次
  globby(srcFiles).then((files) => {
    Promise.all(
      files
        .map((file) => file.replace(/\\|\//g, path.sep))
        .map((file) => copyOrCompile(file)),
    );
  });
}
