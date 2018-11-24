// pages/buy/BuyPage/BuyPage.js
import WxValidate from '../../../utils/WxValidate.js'
import { backendServer } from "../../../utils/constant";
const app = getApp()
var params = {}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:"",
    sellername:"",
    desc:"",
    price:"",
    goodsimg:"",
    avatarUrl:"",
    nickName:"",


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id,
    })
  },

  //调用验证函数
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带的数据为：', e.detail.value),
     params = e.detail.value;
     params.itemId = this.data.id;
     params.sessionKey = app.globalData.sessionKey;
    //校验表单
    this.upload()
  },
  upload:function(){
    var that = this
    if (params.dorm.length == 0 || params.phoneNumber.length == 0){
      wx.showToast({
        title: '请输入完整收货信息！',
        icon: 'loading',
        duration: 1500
      });
    }
    else{
      if (params.sessionKey.length == 0) {
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
                url: '../../mine/mine',
              })
            }
          }
        })
      }else{
        wx.request({
          url: backendServer + '/item/deal',
          data: params,
          method: 'POST',
          header: { // 设置请求的 header
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: function (res) {
            console.log(res)
            if (res.statusCode = 200) {
              wx.showToast({
                title: '购买成功！',
                duration: 3000
              });
              wx.navigateTo({
                url: '../pay/pay',
                success: function (res) { },
                fail: function (res) { },
                complete: function (res) { },
              })
            }
          },
          fail: function () {
            wx.navigateTo({
              url: '../payfalse/payfalse',
              success: function (res) { },
              fail: function (res) { },
              complete: function (res) { },
            })
          },
        })
      }
      
    }
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let sessionKey = app.getSessionKeyOrElsePrompt();

    if (sessionKey) {
      this.detailsPage()
    }
  },
  //获得订单信息
  detailsPage: function () {
    var a = this.data.id
    console.log(a)
    var that = this;
    wx.request({
      url: backendServer + '/item/detail',
      data: {
        itemId: a,
      },
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res)
        that.setData({
          price: res.data.price,
          desc: res.data.desc,
          goodsimg: res.data.cover,
        })

      }
    })
    wx.getUserInfo({
      success: function (res) {

        console.log(res.userInfo)
        that.setData({
          avatarUrl: res.userInfo.avatarUrl,
          nickName: res.userInfo.nickName
        })

        // console.log(res.userInfo)
      }
    })

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
