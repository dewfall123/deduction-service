// index.ts

import { wxp } from '../../utils/wxp';
import { SERICE_STATUS, Service } from '../type';
import { ArrowColor } from '../constants';

// 获取应用实例
const app = getApp<IAppOption>();

Page({
  data: {
    userInfo: null as null | WechatMiniprogram.UserInfo,
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    services: [] as Service[],
    status: SERICE_STATUS.生效中,
    ArrowColor,
  },
  onLoad(option) {
    this.ensureUserInfo();
    if (option.status) {
      this.setData({
        status: option.status as SERICE_STATUS,
      });
    }
    this.getPayServices();
  },
  getUserInfo(e: any) {
    console.log(e);
    app.globalData.userInfo = e.detail.userInfo;
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true,
    });
  },
  ensureUserInfo() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
      });
      return;
    }
    if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = (res) => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
        });
      };
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wxp.getUserInfo().then((res) => {
        app.globalData.userInfo = res.userInfo;
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
        });
      });
    }
  },
  async getPayServices() {
    const { data } = await wxp.request({
      url: 'https://example.com/api/pay-services',
      data: {
        id: 'TODO',
        status: this.data.status,
      },
    });
    this.setData({ services: data as Service[] });
  },
});
