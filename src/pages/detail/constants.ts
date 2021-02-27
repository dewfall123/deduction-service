import { formatDate } from '../../utils/util';
import { Service } from '../type';

export const stopButtons = [{ text: '取消' }, { text: '仍要关闭' }];
export const deleteButtons = [{ text: '取消' }, { text: '确定' }];
export const DELETE_CONFIRM_TEXT =
  '删除后，将无法查看此项目详情，也无法查看历史扣费记录。确认删除?';

export function processService(service: Service) {
  return {
    ...service,
    signTime: formatDate(service.signTime),
  };
}
