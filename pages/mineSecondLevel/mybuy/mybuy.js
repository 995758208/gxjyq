//获取应用实例
const app = getApp()

Page({
  data: {
    sellList: [
      {
        img: '../../../images/leaseImg/1.jpg',
        dir: '商品信息商品信息商品信息商品信息',
        money: '123',
        num: '12321'
      },
      {
        img: '../../../images/leaseImg/4.jpg',
        dir: '商品简介商品简介商品简介商品简介商品简介商品简介商品简介商品简介',
        money: '1234',
        num: '1234567'
      },
      {
        img: '../../../images/leaseImg/5.jpg',
        dir: '商品简介',
        money: '123456',
        num: '1'
      },
      {
        img: '../../../images/leaseImg/2.jpg',
        dir: '商品简介商品简介商品简介商品简介商品简介',
        money: '123456',
        num: '123456'
      }
    ]
  },
  // 点击下拉显示框
  selectTap() {
    this.setData({
      show: !this.data.show
    });
  },
  // 点击下拉列表
  optionTap(e) {
    let Index = e.currentTarget.dataset.index;//获取点击的下拉列表的下标
    this.setData({
      index: Index,
      show: !this.data.show
    });
  },
  onLoad: function (options) {

  },
  showMould: function () {
    wx.showShareMenu({
      withShareTicket: true,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  }
})