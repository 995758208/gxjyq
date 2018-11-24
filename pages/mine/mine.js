import {backendServer} from "../../utils/constant";

//获取应用实例
const app = getApp()

Page({
  data: {
    avatarUrl: '../../images/leaseImg/5.jpg',
    nickName: '未登录',
    cxd: '???',
    kb: '???',
    sendNum: 0,
    buyNum: 0,
    rentNum: 0,
    id: 0,
    myDay: 0,
    myName: '伞'
  },

  // 获取用户信息
  getUserInfo: function () {
    var that = this

    wx.getUserInfo({
      success: function (res) {
        app.globalData.avatarUrl = res.userInfo.avatarUrl
        app.globalData.nickName = res.userInfo.nickName
        console.log(res.userInfo)
        that.setData({
          avatarUrl: res.userInfo.avatarUrl,
          nickName: res.userInfo.nickName
        }, function() {
          wx.login({
            success: function (res) {
              console.log("jscode", res.code);
              wx.request({
                url: backendServer + '/wechat_login',
                method: 'POST',
                data: {
                  code: res.code,
                  avatarUrl: that.data.avatarUrl,
                  nickName: that.data.nickName
                },
                header: {
                  //设置参数内容类型为x-www-form-urlencoded
                  'content-type': 'application/x-www-form-urlencoded',
                  'Accept': 'application/json'
                },
                success: function (res) {
                  app.globalData.sessionKey = res.data
                  console.log('/wechat_login res', res)
                },
                fail: function () {
                  console.log('/wechat_login failed')
                }
              })
            }
          })
        });
      },
      fail: function () {
        console.log("无法获取昵称")
      }
    });
  },
})


// 登录验证
App({
  onLaunch: function () {

  }
})
//检测当前用户登录态是否有效
wx.checkSession({
  success: function () {
    //session 未过期，并且在本生命周期一直有效
    console.log('用户登录态有效')
    app.globalData.id = 2
  },
  fail: function () {
    //登录态过期
    wx.login() //重新登录
  }
})
// 获取授权状态
wx.getSetting({
  success: (res) => {
    /*
     * res.authSetting = {
     *   "scope.userInfo": true,
     *   "scope.userLocation": true
     * }
     */
  },

})

