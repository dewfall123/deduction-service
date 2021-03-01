const del = require('del');

// 每次打包前清除dist 保留miniprogram_npm
del(['dist/**/*', '!dist/miniprogram_npm']).then(() => {
  console.log('finish clear.');
});
