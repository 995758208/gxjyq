import {backendServer} from "../../utils/constant";
const util = require('../../utils/util.js');

//获取应用实例
const app = getApp()

Page({
  data:
    {
      navImg: ["../../images/scrollImg/scroll1.jpg", "../../images/scrollImg/scroll2.jpg", "../../images/scrollImg/scroll3.jpg", "../../images/scrollImg/scroll4.jpg", "../../images/scrollImg/scroll5.jpg"],
      indicatorDots: true,
      vertical: true,
      autoplay: false,
      circulars: true,
      interval: 3000,
      duration: 1500,

      news: [{
        headingImg: '../../images/leaseImg/1.jpg',
        title: '#军训',
        seeNum: '123',
        heading: '军姿一小时',
        new: 'information消息灵通人士awell-informedsource本地消息local news据新华社消息according to a Xinhua dispatch',
        showImg: ['../../images/leaseImg/2.jpg', '../../images/leaseImg/4.jpg', '../../images/leaseImg/5.jpg'],
        writer: 'ZhengJa',
        data: '06-08',
        text: ['a', 'b', 'c'],
        newsNum: '10'
      }, {
        headingImg: '../../images/leaseImg/2.jpg',
        title: '#美食',
        seeNum: '1102',
        heading: '深圳美食',
        new: '#东门美食街#龙岗老街#东汇城....',
        showImg: ['../../images/leaseImg/4.jpg'],
        writer: 'ZhengJa',
        data: '08-24',
        text: ['a', 'b', 'c'],
        newsNum: '102'
      }, {
        headingImg: '../../images/leaseImg/2.jpg',
        title: '#美食',
        seeNum: '1102',
        heading: '深圳美食',
        new: '#东门美食街#龙岗老街#东汇城....',
        showImg: ['../../images/leaseImg/4.jpg', '../../images/leaseImg/5.jpg', '../../images/leaseImg/2.jpg', '../../images/leaseImg/4.jpg', '../../images/leaseImg/5.jpg', '../../images/leaseImg/2.jpg', '../../images/leaseImg/4.jpg', '../../images/leaseImg/5.jpg', '../../images/leaseImg/2.jpg'],
        writer: 'ZhengJa',
        data: '08-24',
        text: ['a', 'b', 'c'],
        newsNum: '102'
      }]
    },

  getPostList: function (page, count) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: backendServer + '/post/list',
        data: {
          page: page,
          count: count
        },
        method: 'GET',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          resolve(res)
        },
        fail: function (res) {
          reject(res)
        }
      })
    })
  },

  createPost: function (title, content, images = "") {
    let sessionKey = app.getSessionKeyOrElsePrompt();
    wx.request({
      url: backendServer + '/post/create',
      data: {
        sessionKey: sessionKey,
        title: title,
        content: content,
        images: images
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res)
      },
      fail: function (res) {
        console.log(res)
      }
    })
  },

  // 初始化数据
  onShow: function () {
    console.log(this.getPostList(0, 20))
  },

  // 下拉刷新
  onPullDownRefresh: function () {
    let p = this;
    this.getPostList(0, 20)
      .then(res => {
        p.setData({
          hasMore: res.data.hasMore,
          postList: res.data.postList
        })
      })
  },

  actioncnt: function () {
    wx.showActionSheet({
      itemList: ['发布文章', '从相册选择'],
      success: function (res) {
        console.log(res.tapIndex);
        if (res.tapIndex === 0) {
          wx.navigateTo({
            url: 'article/article',
            success: function (res) {
            },
            fail: function (res) {
            },
            complete: function (res) {
            },
          })
        } else if (res.tapIndex === 1) {
          wx.chooseImage({
            count: 9, // 设置最多9张
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success(res) {
              var tempFilePaths = res.tempFilePaths;
              // 图片预览
              wx.previewImage({
                current: res.tempFilePaths[0],
                urls: res.tempFilePaths
              })

            }
          })
        }
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },
  forum3: function () {
    wx.navigateTo({
      url: 'forum3/forum3',
    })
  }

})
