//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  // 判断用户是否有登录，如果还没登录，执行onFailure，如果已登录，返回sessionKey
  getSessionKeyOrElse: function(onFailure) {
    let sessionKey = this.globalData.sessionKey
    console.log(sessionKey)
    if (!sessionKey) {
      onFailure()
    }

    return sessionKey
  },
  // 判断用户是否有登录，如果还没登录，弹出窗口提示是否登录，跳转到“我的”页面
  getSessionKeyOrElsePrompt: function() {
    let onFailure = function() {
      wx.showModal({
        title: '您还未登录！',
        content: '请问是否前往登录？',
        showCancel: true,//是否显示取消按钮
        success: function (res) {

        },
        complete: function (res) {
          if (res.cancel) {
            //点击取消,默认隐藏弹框
            console.log("取消")
          } else {
            console.log("确定")
            //点击确定
            wx.switchTab({
              url: '/pages/mine/mine',
            })
          }
        }
      })
    };

    return this.getSessionKeyOrElse(onFailure)
  },
  globalData: {
    //用户
    phone:"",
    sessionKey:""
  }
})
