const del = require('del');

del(['dist/**/*', '!dist/miniprogram_npm']).then(() => {
  console.log('finish clear.');
});
