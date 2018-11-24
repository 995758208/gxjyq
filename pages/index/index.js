import {backendServer} from "../../utils/constant";
//index.js
//获取应用实例
const app = getApp()

//index.js
Page({
  data: {
    backgroundImg: ["../../images/scrollImg/scroll1.jpg", "../../images/scrollImg/scroll2.jpg", "../../images/scrollImg/scroll3.jpg", "../../images/scrollImg/scroll4.jpg", "../../images/scrollImg/scroll5.jpg"],
    indicatorDots: true,
    vertical:true,
    autoplay: false,
    circulars: true,
    interval: 3000,
    duration: 1500,
    adv: ["../../images/yscroll/gg.jpg", "../../images/mineImg/jfsc.png"],
    routers: [
      {
        URL: '../buy/buy',
        name: '买卖自由',
        icon: '../../images/navIcon/buy1.png'
      }, {
        URL: './rent/rent',
        name: '租赁',
        icon: '../../images/navIcon/zhu.png'
      }, {
        function: 'tabRoll',
        URL: '../forum/forum',
        name: '鲸鱼圈',
        icon: '../../images/navIcon/shudong.png'
      }, {
        URL: './server/server',
        name: '服务',
        icon: '../../images/navIcon/server.png'
      }, {
        URL: './stop/stop',
        name: '兼职',
        icon: '../../images/navIcon/hot.png'
      }, {
        name: '课表',
        icon: '../../images/navIcon/more.png'
      }
    ],
    serverGoods: [
      { name2: '拿快递', price: '10', mouth: 'good', honest: '4.8', num: '666', img: '../../images/leaseImg/4.jpg' },
      { name2: '买奶茶', price: '100', mouth: 'good', honest: '4.8', num: '888', img: '../../images/leaseImg/5.jpg' }
    ],
    leaseImg: [
      { name2: '雨伞', price: '10', mouth: 'good', honest: '4.8',num: '666', img: '../../images/leaseImg/4.jpg' },
      { name: '汽车', price: '100', mouth: 'good', honest: '4.8', num: '888', img: '../../images/leaseImg/5.jpg' }
    ],
    BusinessImg: [

    ]
  },
  onShow:function(){
    var that = this
    wx.request({
      url: backendServer + '/item/list',
      data:{
          page:0,
          count:2
      },
      method: 'GET',
      header: { // 设置请求的 header
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res)
        that.setData({
          BusinessImg: res.data.list,

        })
      }
    })
  },
  onLoad: function () {
    let sessionKey = app.getSessionKeyOrElsePrompt();

    // TODO: 这个是什么作用的？这代码没效果
    if (sessionKey) {
      autoplay: !this.data.autoplay
    }
  },
  tabRoll: function () {
    wx.reLaunch({
      url: '../forum/forum',
      success: function(res) {
        console.log('success')
      },
      fail: function(res) {
        console.log('fail')
      },
      complete: function(res) {
        console.log('complete')
      },
    })
  },
  //买卖跳转
  buy: function (event){
    console.log("携带数据：",event)
    var p = event.currentTarget.id
    wx.navigateTo({
      url: '../buy/details/details?id=' + p,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  }
})
