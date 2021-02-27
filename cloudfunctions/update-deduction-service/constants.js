const COLLECTION_NAME = 'deduction-services';

// 允许更新的KEY值
const VALID_KEYS = ['status'];

const CODE_MSG_MAP = {
  '-1': '服务异常',
  1: '缺少id参数',
  2: '操作非法',
};

module.exports = {
  COLLECTION_NAME,
  VALID_KEYS,
  CODE_MSG_MAP,
};
