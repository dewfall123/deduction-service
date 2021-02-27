// detail.ts

import { wxp } from '../../utils/wxp';
import { checkCloudResult } from '../../utils/util';
import {
  Service,
  SERVICE_STATUS_MAP,
  PAY_WAY_MAP,
  CloudResult,
  SERICE_STATUS,
} from '../type';
import {
  processService,
  DELETE_CONFIRM_TEXT,
  stopButtons,
  deleteButtons,
} from './constants';
import { ArrowColor } from '../constants';

Page({
  data: {
    loading: true,
    id: '',
    service: null as null | Service,
    SERVICE_STATUS_MAP,
    PAY_WAY_MAP,
    ArrowColor,
    DELETE_CONFIRM_TEXT,
    stopButtons,
    deleteButtons,
    stopDialogShow: false,
    deleteDialogShow: false,
  },
  onLoad(option) {
    if (!option.id) {
      wxp.showToast({
        title: '链接参数异常',
        icon: 'none',
        duration: 2000,
      });
      return;
    }
    this.setData({ id: option.id });
  },
  onShow() {
    this.getService();
  },
  // 根据id获取服务信息
  async getService() {
    const { result } = await wx.cloud.callFunction({
      name: 'get-deduction-service',
      data: {
        id: this.data.id,
      },
    });
    if (!checkCloudResult(result as CloudResult)) {
      return;
    }
    this.setData({
      service: processService((result as CloudResult).data as Service),
      loading: false,
    });
  },
  // 关闭当前服务
  async stopService(e: any) {
    // index代表关闭按钮
    if (e.detail.index === 1) {
      const { result } = await wx.cloud.callFunction({
        name: 'update-deduction-service',
        data: {
          id: this.data.id,
          key: 'status',
          value: SERICE_STATUS.已停用,
        },
      });
      checkCloudResult(result as CloudResult);
      // 刷新数据
      this.getService();
    }

    this.setData({
      stopDialogShow: false,
    });
  },

  openStopConfirm() {
    this.setData({
      stopDialogShow: true,
    });
  },

  async deleteService(e: any) {
    if (e.detail.index === 1) {
      const { result } = await wx.cloud.callFunction({
        name: 'update-deduction-service',
        data: {
          id: this.data.id,
          key: 'deleted',
          value: true,
        },
      });
      checkCloudResult(result as CloudResult);
      // 返回首页
      wx.reLaunch({ url: 'pages/index/index' });
    }
    this.setData({
      deleteDialogShow: false,
    });
  },

  openDeleteConfirm() {
    this.setData({
      deleteDialogShow: true,
    });
  },
});
