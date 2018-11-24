import {backendServer} from "../../utils/constant";

var p = 1;
//获取应用实例
const app = getApp()
Page({
  data: {
    school: '广东农工商职业技术学院',
    buyGoods: [],
    Hasmore: null,
  },

  onShow: function () {
    this.loadPage()
  },
  //下拉刷新
  onPullDownRefresh: function () {
    // 显示顶部刷新图标
    wx.showNavigationBarLoading();
    var that = this;
    wx.request({
      url: backendServer + '/item/list',
      data: {
        page: 0,
        count: 20
      },
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res)
        that.setData({
          buyGoods: res.data.list,
          Hasmore: res.data.hasMore
        })
        wx.hideNavigationBarLoading();
        // 停止下拉动作
        wx.stopPullDownRefresh();
      },
      fail: function (res) {
        console.log(res)
      }
    })
  },
  //上拉加载更多
  onReachBottom: function (Hasmore) {
    var that = this;
    // 显示加载图标

    var hasmore = this.data.Hasmore
    if (hasmore == true) {
      wx.showLoading({
        title: '玩命加载中',
      });
      wx.request({
        url: backendServer + '/item/list',
        data: {
          page: p,
          count: 20
        },
        method: "GET",
        // 请求头部
        header: {
          'content-type': 'application/text'
        },
        success: function (res) {
          console.log(res)
          // 回调函数
          var a = res.data.hasMore;
          console.log(a);
          // 设置数据
          that.setData({
            buyGoods: that.data.buyGoods.concat(res.data.list),
            Hasmore: a
          });
          if (res.data.hasMore == true) {
            p++;
          } else {
            wx.showToast({
              title: '已加载全部',
              duration: 1500
            });

          }
          // 隐藏加载框
          wx.hideLoading();
        }
      })
    }
  },
  loadPage: function () {
    var app = this;
    console.log('测试')
    wx.request({
      url: backendServer + '/item/list',
      data: {
        page: 0,
        count: 20
      },
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res)
        app.setData({
          buyGoods: res.data.list,
          Hasmore: res.data.hasMore
        })
      },
      fail: function (res) {
        console.log(res)
      }
    })
  },

  rander: function (event) {
    console.log(event)
    var p = event.currentTarget.id
    console.log(p)
    wx.navigateTo({
      url: 'details/details?id=' + p,
      success: function (res) {
      },
      fail: function (res) {
      },
      complete: function (res) {
      },
    })
  },


})
