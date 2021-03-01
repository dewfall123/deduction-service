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

// 超时时间
const MAX_TIME = 10 * 1000;
// 封装云函数请求接口，统一错误处理。
export async function cloudRequest(
  param: OQ<ICloud.CallFunctionParam> | RQ<ICloud.CallFunctionParam>,
) {
  try {
    const timer = setTimeout(() => {
      wx.showToast({
        title: '接口超时，请稍后再试',
        icon: 'none',
        duration: 60 * 1000,
      });
    }, MAX_TIME);
    const data = await wx.cloud.callFunction(param);
    clearTimeout(timer);
    const result = (data as any)?.result as CloudResult;
    wx.hideToast();
    if (result?.code !== 0) {
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
      title: '服务异常，请稍后再试',
      icon: 'none',
      duration: 20 * 1000,
    });
    throw err;
  }
}
