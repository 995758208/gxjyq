// pages/forum/forum3/forum3.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user:[{
      headingImg: '../../../images/leaseImg/1.jpg',
      username:"Mr.乐",
      //时间用接口获取，暂时写死
      time:"10秒前",
      heading: '军姿一小时',
      newsNum:123,
      new: 'information消息灵通人士awell-informedsource本地消息local news据新华社消息according to a Xinhua dispatch',
      showImg: ['../../../images/leaseImg/2.jpg', '../../../images/leaseImg/4.jpg', '../../../images/leaseImg/5.jpg'],
    }],
    comment:[{
      headingImg: '../../../images/leaseImg/4.jpg',
      commentname:"匿名",
      time: "10秒前",
      new: '好看倒萨u盾哈市简单化'
    },
      {
        headingImg: '../../../images/leaseImg/2.jpg',
        commentname: "匿名",
        time: "1分钟前",
        new: 'sdhahduahdjsnadshansjdasjh'
      }
    ]
  },
  report:function(){
    wx.navigateTo({
      url: '../../mineSecondLevel/center/center',
    })
  }
  
})