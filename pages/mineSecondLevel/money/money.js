import {
  backendServer
} from "../../../utils/constant";

const app = getApp()

// pages/index/server/server.js
var p = 1;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    Hasmore: null,
    serverGoods: [

    ],
    nickName: "",
  },

  onLoad: function() {
    this.loadPage()
    var that = this
    wx.getUserInfo({
      success: function(res) {
        that.setData({
          nickName: res.userInfo.nickName
        })
      },
    })
  },


  //下拉刷新
  onPullDownRefresh: function() {
    // 显示顶部刷新图标
    wx.showNavigationBarLoading();
    var that = this;
    wx.request({
      url: backendServer + '/task/list',
      data: {
        page: 0,
        count: 20
      },
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        var resultSet = res.data.list
        const length = resultSet.length
        for (let i = 0; i <= length; i++) {
          if (resultSet[i].publisher.name === that.data.nickName) {
            console.log(that.data.nickName)
            that.setData({
              serverGoods: res.data.list,
              Hasmore: res.data.hasMore
            })
          }
        }
        wx.hideNavigationBarLoading();
        // 停止下拉动作
        wx.stopPullDownRefresh();
      },
      fail: function(res) {
        console.log(res)
      }
    })
  },
  //上拉加载更多
  onReachBottom: function(Hasmore) {
    var that = this;
    // 显示加载图标

    var hasmore = this.data.Hasmore
    if (hasmore == true) {
      wx.showLoading({
        title: '玩命加载中',
      });
      wx.request({
        url: backendServer + '/task/list',
        data: {
          page: p,
          count: 20
        },
        method: "GET",
        // 请求头部
        header: {
          'content-type': 'application/text'
        },
        success: function(res) {
          var resultSet = res.data.list
          const length = resultSet.length
          for (let i = 0; i <= length; i++) {
            if (resultSet[i].publisher.name === that.data.nickName) {
              console.log(resultSet[i].publisher.name)
              // 回调函数
              var a = res.data.hasMore;
              console.log(a);
              // 设置数据
              that.setData({
                serverGoods: that.data.serverGoods.concat(res.data.list),
                Hasmore: a
              });
            }
          }
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
  loadPage: function() {
    var or = this;
    console.log('测试'),
      wx.request({
        url: backendServer + '/task/list',
        data: {
          page: 0,
          count: 20
        },
        method: 'GET',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function(res) {
          var resultSet = res.data.list
          const length = resultSet.length
          console.log(length)
          for (let i = 0; i <= length; i++) {
            if (or.data.nickName === resultSet[i].publisher.name) {
              console.log(resultSet[i].publisher.name)
              or.setData({
                serverGoods: res.data.list,
                Hasmore: res.data.hasMore,

              })
            }
          }

        },

        fail: function(res) {
          console.log(res)
        },

      })

  },

  detail: function(event) {
    var p = event.currentTarget.id
    wx.navigateTo({
      url: 'detail/detail?id=' + p,
      success: function(res) {
        console.log(res)
      },
      fail: function(res) {},
      complete: function(res) {},
    })

  }
})