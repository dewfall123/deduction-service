const chokidar = require('chokidar');
const fsExtra = require('fs-extra');
const { copyOrCompile } = require('./util');

const srcFiles = [
  'src/**/*.less',
  'src/**/*.json',
  'src/**/*.wxml',
  // 兼容
  'src/**/*.wxss',
  'src/**/*.js',
];

chokidar
  .watch(srcFiles)
  .on('change', (file) => copyOrCompile(file))
  .on('add', (file) => copyOrCompile(file))
  .on('unlink', (file) => fsExtra.remove(file));
