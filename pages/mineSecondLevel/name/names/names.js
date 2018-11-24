//获取应用实例
const app = getApp()

Page({
  data: {
    schoolName: '',
    major: '',
    userName: '',
    num: '',
    psw: ''
  },
  //获取用户输入值
  schoolInput: function (e) {
    this.setData({
      schoolName: e.detail.value
    })
  },
  majorInput: function (e) {
    this.setData({
      major: e.detail.value
    })
  },
  userInput: function (e) {
    this.setData({
      userName: e.detail.value
    })
  },
  numInput: function (e) {
    this.setData({
      num: e.detail.value
    })
  },
  pswInput: function (e) {
    this.setData({
      psw: e.detail.value
    })
  },

  test:function(e){
    // console.log(this.data.schoolName, this.data.major, this.data.userName, this.data.num, this.data.psw)
    if (this.data.schoolName===''){
      wx.showModal({
        title: '错误',
        content: '请输入学校名称',
      })
    } else if (this.data.major===''){
      wx.showModal({
        title: '错误',
        content: '请输入专业名称'
      })
    } else if (this.data.userName === '') {
      wx.showModal({
        title: '错误',
        content: '请输入名字',
      })
    } else if (this.data.num === '') {
      wx.showModal({
        title: '错误',
        content: '请输入学号',
      })
    } else if (this.data.psw === '') {
      wx.showModal({
        title: '错误',
        content: '请输入密码',
      })
    }
  }
})