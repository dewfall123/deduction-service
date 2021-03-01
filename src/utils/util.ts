import dayjs from 'dayjs';
import { CloudResult } from '../pages/type';

export function formatDate(date: string, format = 'YYYY-MM-DD HH:ss') {
  return dayjs(date).format(format);
}

export function enumToMap(e: Record<string, string>) {
  return Object.entries(e).reduce((map, [key, value]) => {
    map[value] = key;
    return map;
  }, {} as Record<string, string>);
}

// 封装云函数请求接口，统一错误处理。
export async function cloudRequest(
  param: OQ<ICloud.CallFunctionParam> | RQ<ICloud.CallFunctionParam>,
) {
  try {
    const data = await wx.cloud.callFunction(param);
    const result = (data as any)?.result as CloudResult;
    if (result?.code !== 0) {
      wx.hideToast();
      wx.showToast({
        title: result.msg ?? '服务异常',
        icon: 'none',
        duration: 2000,
      });
    }
    return result;
  } catch (err) {
    // TODO 接口错误在此处埋点上报
    wx.hideToast();
    wx.showToast({
      title: '服务异常',
      icon: 'none',
      duration: 5 * 1000,
    });
    throw err;
  }
}
