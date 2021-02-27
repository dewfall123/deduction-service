const path = require('path');
const gulp = require('gulp');
const gulpRename = require('gulp-rename');
const gulpLess = require('gulp-less');
const fsExtra = require('fs-extra');

const outDir = require('../project.config.json').miniprogramRoot;
const srcReg = /^src(\/|\\)?/;

function compileLessFile(file) {
  gulp
    .src(file, { allowEmpty: true })
    .pipe(
      gulpLess().on('error', (e) => {
        console.error(e.message);
      }),
    )
    .pipe(
      gulpRename((file) => {
        // console.log(file);
        return {
          dirname: file.dirname.replace(srcReg, ''),
          basename: file.basename,
          extname: '.wxss',
        };
      }),
    )
    .pipe(gulp.dest(outDir));
}

function copyFile(file) {
  fsExtra.copy(file, file.replace(srcReg, outDir));
}

// function noop() {}

const fileHandles = {
  '.less': compileLessFile,
};

function copyOrCompile(file) {
  const handleFn = fileHandles[path.extname(file)] || copyFile;
  handleFn(file);
  console.log('copy ' + file);
}

module.exports = {
  copyOrCompile,
};
