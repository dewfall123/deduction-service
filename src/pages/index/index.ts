// index.ts

import { CloudResult, SERICE_STATUS, Service } from '../type';
import { ArrowColor } from '../constants';
import { checkCloudResult } from '../../utils/util';

Page({
  data: {
    status: SERICE_STATUS.生效中,
    services: [] as Service[],
    loading: true,
    ArrowColor,
  },
  onLoad(option) {
    // 从链接参数获取status
    if (option.status) {
      this.setData({
        status: option.status as SERICE_STATUS,
      });
    }

    this.getServices();
  },
  // 获取服务列表
  async getServices() {
    const { result } = await wx.cloud.callFunction({
      name: 'get-deduction-services',
      data: {
        status: this.data.status,
      },
    });

    this.setData({
      loading: false,
    });

    if (!checkCloudResult(result as CloudResult)) {
      return;
    }

    this.setData({
      services: (result as CloudResult)?.data as Service[],
    });
  },
});
