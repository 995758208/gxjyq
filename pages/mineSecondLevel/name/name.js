//获取应用实例
const app = getApp()

Page({
  data: {
    checked: '',
    values: '',
    src: ''
  },
  listenCheckboxChange: function (e) {
    console.log(e.detail.value[0])
    this.setData({
      values:e.detail.value[0]
    })
  },
  right: function () {
    if (this.data.values === '我知道了') {
      this.setData({
        values: ''
        // src: 'names/names'
      })
      wx.redirectTo({
        url: 'names/names'
      })
    }else{
      wx.showModal({
        title: '错误',
        content: '了解实名认证，并选择我知道了'
      })
    }
  }
})