import {backendServer} from "../../../utils/constant";

//获取应用实例
const app = getApp()
var comment = {}
Page({
  data: {
    id:"",
    indicatorDots: true,
    vertical: true,
    autoplay: false,
    circulars: true,
    interval: 3000,
    duration: 1500,
    winWidth: 0,
    winHeight: 0,
    // tab切换
    currentTab: 0,
    goodsimg:[],
    price:"",
    desc:"",
    honest: "",
    newnessLevel: "",
    viewCount: "",
    comment:[
    ]

  },
  commentSubmit:function(e){
    console.log(e.detail.value)
    comment.text = e.detail.value.comment
    comment.itemId = this.data.id;
    comment.sessionKey = app.globalData.sessionKey;
    comment.refCommentId = "0"

    console.log(comment)
    this.upload()
  },
  upload: function () {
    var that = this
    wx.request({
      url: backendServer + '/item/comment/create',
      data: comment,
      method: 'POST',
      header: { // 设置请求的 header
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res)
        if (res.statusCode = 200) {
          wx.showToast({
            title: '评论成功！',
            duration: 3000
          });

        }
      }
    })
  },
  //获取当前滑块的index
  bindchange: function (e) {
    const that = this;
    that.setData({
      currentData: e.detail.current
    })
  },
  //点击切换，滑块index赋值
  checkCurrent: function (e) {
    const that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current,
      })
    }
  },
  /*加载上页传来的id*/
  onLoad: function (options) {

    this.setData({
      id: options.id
    })

  },
  /*页面再次加载 */
  onReady:function(){
    this.detailsPage()
    this.detailsComment()
  },
  detailsPage: function (e){
    var a = this.data.id
    console.log(a)
    var app = this;
    wx.request({
      url: backendServer + '/item/detail',
      data: {
        itemId: a,
      },
      method: 'get',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res)
        app.setData({
          price: res.data.price,
          desc: res.data.desc,
          honest: res.data.seller.honest,
          newnessLevel: res.data.newnessLevel,
          viewCount: res.data.viewCount,
          goodsimg: res.data.images
        })
      }
    })

  },
  detailsComment:function(e){
    var a = this.data.id
    console.log(a)
    var app = this;
    wx.request({
      url: backendServer + '/item/comment',
      data: {
        itemId: a,
        page:0,
        count:20,
      },
      method: 'get',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res)
        app.setData({
            comment:res.data.list
        })
      }
    })
  },
  deleteItem: function(itemId) {
    let sessionKey = app.getSessionKeyOrElsePrompt();
    wx.request({
      url: backendServer + '/item/delete',
      data: {
        sessionKey: sessionKey,
        itemId: itemId
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        // TODO: 弹出删除成功提示？
      }
    })
  },
  /**传递id值给下个页面 */
  rander: function (e) {
    var a = this.data.id
    console.log(a)
    wx.navigateTo({
      url: '../BuyPage/BuyPage?id='+a,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  }
})
