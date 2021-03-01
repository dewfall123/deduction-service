const automator = require('miniprogram-automator');
const appJson = require('../src/app.json');

const automatorOptions = require('../automator');
// automator.js 示例
// module.exports = {
//   cliPath: '/path/cli.bat',
//   projectPath: 'path/to/project',
// };

describe('index', () => {
  let miniProgram;
  let page;

  beforeAll(async () => {
    miniProgram = await automator.launch(automatorOptions);

    page = await miniProgram.reLaunch('/' + appJson.pages[0]);

    await page.waitFor(500);
  }, 60 * 1000);

  afterAll(async () => {
    await miniProgram.close();
  });

  // 点击进入详情页面
  it('list action', async () => {
    const listHead = await page.$('.service');

    await listHead.tap();

    await page.waitFor(500);
    expect((await miniProgram.currentPage()).path).toBe('pages/detail/detail');
  });

  // TODO 更多的测试用例
});
