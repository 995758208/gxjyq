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
    singler: "",
    singleImage: "",
    phoneNumber: "",
    releaseTime: "2018年10月18日"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id

    })
  },  
  onReady: function () {
    this.detailsPage()
  },
  detailsPage: function (e) {
    var a = this.data.id
    console.log(a)
    var that = this;
    wx.request({
      url: 'https://www.gxjyxq.cn/task/detail',
      data: {
        taskId: a,
      },
      method: 'get',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
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

  
})