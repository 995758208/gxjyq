import {backendServer} from "../../../../utils/constant";

const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: "",
    name: "",
    desc: "",
    price: "",
    serviceLocation: "",
    serviceTime: "",
    note: "",
    singler:"",
    singleImage:"",
    phoneNumber: "",
    releaseTime: "2018年10月18日"
  },
  onLoad: function(options) {
    this.setData({
      id: options.id

    })
  },
  onReady: function() {
    this.detailsPage()
  },
  detailsPage: function(e) {
    var a = this.data.id
    console.log(a)
    var that = this;
    wx.request({
      url: backendServer + '/task/detail',
      data: {
        taskId: a,
      },
      method: 'get',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        console.log(res)
        res.data.serviceTime = new Date(res.data.serviceTime).toLocaleString()
        that.setData({
          name: res.data.name,
          price: res.data.price,
          desc: res.data.desc,
          serviceTime: res.data.serviceTime,
          serviceLocation: res.data.serviceLocation,
          note: res.data.note,
          phoneNumber: res.data.publisherPhoneNumber,
          singler: res.data.publisher.name,
          singleImage: res.data.publisher.avatar
        })
      }
    })
  },
  // 发布者删除任务
  deleteTask: function (id) {
    let sessionKey = app.getSessionKeyOrElsePrompt();
    wx.request({
      url: backendServer + '/task/delete',
      data: {
        sessionKey: sessionKey,
        itemId: id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        // TODO: 弹出删除成功提示？
      }
    })
  },
})
