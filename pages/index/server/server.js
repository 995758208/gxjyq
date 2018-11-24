import {backendServer} from "../../../utils/constant";

const util = require('../../../utils/util.js');

const app = getApp()
// pages/index/server/server.js
var p = 1;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    page: 0,
    hasMore: null,
    serverGoods: [],
    btn: true,
  },

  getPhoneNumber: util.getPhoneNumber,

  getTaskList: function (page, count) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: "https://www.gxjyxq.cn" + '/task/list',
        data: {
          page: page,
          count: count
        },
        method: 'GET',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          resolve(res)
        },
        fail: function (res) {
          reject(res)
        }
      })
    })
  },

  onLoad: function () {
    this.loadPage()
  },

  //下拉刷新
  onPullDownRefresh: function () {
    let p = this;
    this.getTaskList(0, 20)
      .then(res => {
        p.setData({
          serverGoods: res.data.list,
          hasMore: res.data.hasMore
        });
        wx.hideNavigationBarLoading();
        // 停止下拉动作
        wx.stopPullDownRefresh();
      })
      .catch(err => {
        console.log(err)
      })
  },

  //上拉加载更多
  onReachBottom: function () {
    var that = this;
    // 显示加载图标

    if (this.data.hasMore) {
      wx.showLoading({
        title: '玩命加载中',
      });
      this.getTaskList(that.data.page)
        .then(res => {
          console.log(res)
          // 设置数据
          that.setData({
            serverGoods: that.data.serverGoods.concat(res.data.list),
            hasMore: res.data.hasMore,
            page: res.data.nextPage
          });
          if (!res.data.hasMore) {
            wx.showToast({
              title: '已加载全部',
              duration: 1500
            });
          }
          // 隐藏加载框
          wx.hideLoading();
        })
    }
  },

  loadPage: function () {
    let sessionKey = app.getSessionKeyOrElsePrompt();
    if (sessionKey) {
      this.setData({
        disableAccept: false
      })
    } else {
      this.setData({
        disableAccept: true
      })
    }

    let p = this;
    this.getTaskList(0, 20)
      .then(res => {
        p.setData({
          serverGoods: res.data.list,
          hasMore: res.data.hasMore
        });
        wx.hideNavigationBarLoading();
        // 停止下拉动作
        wx.stopPullDownRefresh();
      })
      .catch(err => {
        console.log(err)
      })
  },


  news: function (event) {
    var p = event.currentTarget.id
    var resultSet = this.data.serverGoods
    const length = resultSet.length
    for (let i = 0; i <= length; i++) {
      if (p == resultSet[i].id) {
        var result = resultSet[i]
        console.log(resultSet[i])
        result.serviceTime = new Date(result.serviceTime).toLocaleString()
        wx.showModal({
          title: result.name,
          content: '服务时间：' + result.serviceTime + '\r\n服务地点:' + result.serviceLocation + '\r\n服务描述:' + result.desc,
          showCancel: true,
          confirmText: '确定抢单',
          confirmColor: '#837fec',
          success: function (res) {
            console.log(res)
            if (res.cancel) {
              //点击取消,默认隐藏弹框
              console.log("取消")
            } else {
              console.log("确定")
              //点击确定
              let sessionKey = app.getSessionKeyOrElsePrompt();
              console.log(sessionKey)
              wx.request({
                url: backendServer + '/task/accept',
                data: {
                  sessionKey: sessionKey,
                  itemId: p
                },
                method: 'POST',
                header: {
                  'content-type': 'application/x-www-form-urlencoded'
                },
                success: function (res) {
                  console.log(res)
                },
                fail: function (res) {
                  console.log(res)
                },

              })
              wx.navigateTo({
                url: 'information/information?id=' + p,
                success: function (res) {
                  console.log(res)

                },
                fail: function (res) {
                },
                complete: function (res) {
                },
              })


            }
          },
        });
      }
    }
  }
})
