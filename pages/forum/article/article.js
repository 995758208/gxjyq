// pages/forum/article/article.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    height: 20,
    school:"所在位置",
  },
  getimage:function( ){
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
})