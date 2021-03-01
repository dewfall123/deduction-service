// 云函数模板
// 部署：在 cloud-functions/login 文件夹右击选择 “上传并部署”

const cloud = require('wx-server-sdk');
const {
  DEFAULT_STATUS,
  COLLECTION_NAME,
  CODE_MSG_MAP,
} = require('./constants');

// 初始化 cloud
cloud.init({
  // API 调用都保持和云函数当前所在环境一致
  env: cloud.DYNAMIC_CURRENT_ENV,
});

const db = cloud.database();
const deductionServices = db.collection(COLLECTION_NAME);

/**
 * 获取支付服务列表
 *
 * event.status 服务状态
 *
 */
exports.main = async (event, context) => {
  const status = event.status || DEFAULT_STATUS;

  // TODO 为了方便演示，省略根据用户ID筛选，所以每个人返回列表相同
  // const wxContext = cloud.getWXContext();
  try {
    const { data: services } = await deductionServices
      .where({ status, deleted: false })
      .get();
    return {
      code: 0,
      data: services,
    };
  } catch (err) {
    console.log(err);
    return {
      code: -1,
      msg: CODE_MSG_MAP[-1],
    };
  }
};
