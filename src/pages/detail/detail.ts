// detail.ts

import { cloudRequest } from '../../utils/util';
import {
  Service,
  SERVICE_STATUS_MAP,
  PAY_WAY_MAP,
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
      wx.showToast({
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
    const result = await cloudRequest({
      name: 'get-deduction-service',
      data: {
        id: this.data.id,
      },
    });

    this.setData({
      service: processService(result.data as Service),
      loading: false,
    });
  },
  // 关闭当前服务
  async stopService(e: any) {
    this.setData({
      stopDialogShow: false,
    });
    // index=1代表关闭按钮
    if (e.detail.index === 1) {
      wx.showToast({
        title: '正在关闭...',
        icon: 'loading',
      });
      await cloudRequest({
        name: 'update-deduction-service',
        data: {
          id: this.data.id,
          key: 'status',
          value: SERICE_STATUS.已停用,
        },
      });
      // 刷新数据
      await this.getService();
      wx.hideToast();
    }
  },

  openStopConfirm() {
    this.setData({
      stopDialogShow: true,
    });
  },
  // 删除服务
  async deleteService(e: any) {
    this.setData({
      deleteDialogShow: false,
    });
    if (e.detail.index === 1) {
      wx.showToast({
        title: '正在删除...',
        icon: 'loading',
      });
      await cloudRequest({
        name: 'update-deduction-service',
        data: {
          id: this.data.id,
          key: 'deleted',
          value: true,
        },
      });
      // 返回首页
      wx.hideToast();
      wx.reLaunch({ url: '/pages/index/index', fail: console.log });
    }
  },

  openDeleteConfirm() {
    this.setData({
      deleteDialogShow: true,
    });
  },
  // 待开发功能提示
  showTODO() {
    wx.showToast({
      title: '开发中...',
      icon: 'none',
      duration: 2 * 1000,
    });
  },
});
