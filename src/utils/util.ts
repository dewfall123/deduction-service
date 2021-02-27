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

export function checkCloudResult(result: CloudResult) {
  if (result?.code !== 0) {
    wx.showToast({
      title: result.msg ?? '服务异常',
      icon: 'none',
      duration: 2000,
    });
  }

  return result?.code === 0;
}
