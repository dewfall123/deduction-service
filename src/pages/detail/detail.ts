// detail.ts

import { wxp } from '../../utils/wxp';
import { checkCloudResult, formatDate } from '../../utils/util';
import {
  Service,
  SERVICE_STATUS_MAP,
  PAY_WAY_MAP,
  CloudResult,
  SERICE_STATUS,
} from '../type';
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
        title: '链接参数异常1',
        icon: 'none',
        duration: 2000,
      });
      return;
    }
    this.getServiceInfo(option.id);
  },
  // 根据id获取服务信息1
  async getServiceInfo(id: string) {
    const { result } = await wx.cloud.callFunction({
      name: 'get-deduction-service',
      data: {
        id,
      },
    });
    if (!checkCloudResult(result as CloudResult)) {
      return;
    }
    this.setData({
      service: (result as CloudResult).data as Service,
    });
  },
  // 关闭当前服务
  async closePayService() {
    const { result } = await wx.cloud.callFunction({
      name: 'update-deduction-service',
      data: {
        status: SERICE_STATUS.已停用,
      },
    });
    if (!checkCloudResult(result as CloudResult)) {
      return;
    }

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
