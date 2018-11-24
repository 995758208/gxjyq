//获取应用实例
const app = getApp()

Page({
  data: {
    currentTab: 0,
    Adata: [
      {
        Aimg: '../../../images/leaseImg/1.jpg',
        Aname: '单车',
        Amoney: '10',
        AuserName: '小郑'
      },
      {
        Aimg: '../../../images/leaseImg/4.jpg',
        Aname: '笔',
        Amoney: '1',
        AuserName: '小刚'
      },
      {
        Aimg: '../../../images/leaseImg/5.jpg',
        Aname: '记分牌',
        Amoney: '5',
        AuserName: '小明'
      },
      {
        Aimg: '../../../images/leaseImg/2.jpg',
        Aname: '打气筒',
        Amoney: '2',
        AuserName: '小红'
      }
    ],
    Bdata: [
      {
        Bimg: '../../../images/leaseImg/4.jpg',
        Bname: 'AJ1',
        Bmoney: '700',
        BuserName: '小安'
      },
      {
        Bimg: '../../../images/leaseImg/2.jpg',
        Bname: '刚笔',
        Bmoney: '100',
        BuserName: '小郑'
      },
      {
        Bimg: '../../../images/leaseImg/1.jpg',
        Bname: '洗衣机',
        Bmoney: '300',
        BuserName: '小瓶'
      },
      {
        Bimg: '../../../images/leaseImg/5.jpg',
        Bname: '凳子',
        Bmoney: '50',
        BuserName: '红艳艳'
      }
    ],
    Cdata: [
      {
        Cimg: '../../../images/leaseImg/5.jpg',
        Cname: '蓝鲸',
        Cmsg: '蓝鲸（学名：Balaenoptera musculus）是一种海洋哺乳动物，属于须鲸亚目。共有四个亚种。'
      },
      {
        Cimg: '../../../images/leaseImg/2.jpg',
        Cname: '虎鲸',
        Cmsg: '蓝鲸（学名：Balaenoptera musculus）是一种海洋哺乳动物，属于须鲸亚目。共有四个亚种。'
      },
      {
        Cimg: '../../../images/leaseImg/1.jpg',
        Cname: '抹香鲸',
        Cmsg: '蓝鲸（学名：Balaenoptera musculus）是一种海洋哺乳动物，属于须鲸亚目。共有四个亚种。'
      }
    ]
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数

  },
  //滑动切换
  swiperTab: function (e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    });
  },
  //点击切换
  clickTab: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  }
})
