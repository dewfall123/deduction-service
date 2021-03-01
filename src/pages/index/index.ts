// index.ts

import { SERICE_STATUS, Service, SERVICE_STATUS_MAP } from '../type';
import { ArrowColor } from '../constants';
import { cloudRequest } from '../../utils/util';

Page({
  data: {
    status: SERICE_STATUS.生效中,
    services: [] as Service[],
    loading: true,
    ArrowColor,
    SERVICE_STATUS_MAP,
  },
  onLoad(option) {
    // 从链接参数获取status
    if (option.status) {
      this.setData({
        status: option.status as SERICE_STATUS,
      });
    }
  },
  onShow() {
    this.getServices();
  },
  // 获取服务列表
  async getServices() {
    this.setData({
      loading: true,
    });
    const result = await cloudRequest({
      name: 'get-deduction-services',
      data: {
        status: this.data.status,
      },
    });

    // 有支付分的排在前面
    const services = (result?.data as Service[]).sort((a) =>
      a.payScore ? -1 : 1,
    );

    this.setData({
      loading: false,
      services,
    });
  },
});
