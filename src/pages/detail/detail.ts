// detail.ts

import { wxp } from '../../utils/wxp';
import { formatDate } from '../../utils/util';
import { Service, SERVICE_STATUS_MAP, PAY_WAY_MAP } from '../type';
import { ArrowColor } from '../constants';

Page({
  data: {
    service: null as null | Service,
    formatDate,
    SERVICE_STATUS_MAP,
    PAY_WAY_MAP,
    ArrowColor,
    buttons: [{ text: '取消' }, { text: '仍要关闭' }],
    dialogShow: false,
  },
  onLoad(option) {
    if (!option.id) {
      wxp.showToast({
        title: '链接参数异常',
        icon: 'loading',
        duration: 2000,
      });
      return;
    }
    this.getServiceInfo(option.id);
  },
  async getServiceInfo(id: string) {
    const { data } = await wxp.request({
      url: 'https://example.com/api/pay-service/detail',
      data: {
        unionId: 'TODO',
        id: id,
      },
    });
    this.setData({
      service: data as Service,
    });
  },
  async closePayService() {
    this.setData({
      dialogShow: false,
    });
  },
  openConfirm() {
    this.setData({
      dialogShow: true,
    });
  },
});
