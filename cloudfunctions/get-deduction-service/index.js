// 云函数模板
// 部署：在 cloud-functions/login 文件夹右击选择 “上传并部署”

const cloud = require('wx-server-sdk');
const { COLLECTION_NAME, CODE_MSG_MAP } = require('./constants');

// 初始化 cloud
cloud.init({
  // API 调用都保持和云函数当前所在环境一致
  env: cloud.DYNAMIC_CURRENT_ENV,
});

const db = cloud.database();
const deductionServices = db.collection(COLLECTION_NAME);

/**
 * 根据id获取服务
 *
 * event.id 服务_id
 *
 */
exports.main = async (event, context) => {
  const id = event.id;

  if (!id) {
    return {
      code: 1,
      msg: CODE_MSG_MAP[1],
    };
  }

  try {
    const { data: service } = await deductionServices.doc(id).get();
    return {
      code: 0,
      data: service,
    };
  } catch (err) {
    console.log(err);
    return {
      code: -1,
      msg: CODE_MSG_MAP[-1],
    };
  }
};
