import {backendServer} from "../../utils/constant";

//获取应用实例
const app = getApp()
import WxValidate from '../../utils/WxValidate.js'
var util = require('../../utils/util.js');
var adds = {}
var news = {}
Page({
  data: {
    selected1: false,
    selected2: false,
    selected: true,
    universityId: 1, // 暂时写死1表示农工商，不要改！！！
    show: false, //控制下拉列表的显示隐藏，false隐藏、true显示
    selectData: ['广东农工商职业技术学院', '清华大学', '北京大学', '广州大学', '深圳大学', '惠州大学'], //下拉列表的数据
    selectData2: ['书籍', '电子产品', '日用品', '学习用品', '娱乐设备', '其他'],
    index: 0, //选择的下拉列表下标,
    sellDirction: '详细描述会为你带来最快速的成交哦：1、描述一下你物品的特点，如吉他；木制，磨沙。2、描述一下物品如何使用，要注意的地方。3、描述一下你希望租客如何对待物品。',
    images: [],
    dizhi: [],
    cover: "",
    form: {
      name: '',
      //number: '',
      phone: '',
      // range:''
    },
  },
  //判断用户是否登录
  onShow: function() {
    app.getSessionKeyOrElsePrompt()
  },
  // 点击下拉显示框
  selectTap() {
    this.setData({
      show: !this.data.show
    });
  },
  // 点击下拉列表
  optionTap(e) {
    let Index = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    this.setData({
      index: Index,
      show: !this.data.show
    });
  },

  onLoad() {
    this.initValidate()
    console.log(this.WxValidate)
  },

  showModal(error) {
    wx.showModal({
      content: error.msg,
      showCancel: false,
    })
  },
  //验证函数
  initValidate() {
    const rules = {
      name: {
        required: true,
        minlength: 2
      },
      /* number: {
         required: true,
         number: true
       },*/
      phone: {
        required: true,
        tel: true
      },

      /*range:{
        required: true,
        range: true
      }*/
    }

    const messages = {
      name: {
        required: '请填写商品名称',
        minlength: '请输入正确的名称'
      },
      /*number: {
        required: '请输入价格',
        number: '请填写有效价格'
      },*/
      phone: {
        required: '请填写手机号',
        tel: '请填写正确的手机号'
      },

      /*range:{
        required: '请输入商品新旧程度',
        range: '请输入1-10成新'
      }*/
    }
    this.WxValidate = new WxValidate(rules, messages)
  },



  //提交数据

  buySubmit: function(e) {
    console.log('form发生了submit事件，携带的数据为：', e.detail.value),
      adds = e.detail.value;
    adds.sessionKey = app.globalData.sessionKey
    adds.universityId = "1"
    adds.images = this.data.dizhi
    adds.cover = this.data.dizhi[0]
    console.log(adds)
    if (!this.WxValidate.checkForm(adds)) {
      const error = this.WxValidate.errorList[0]
      this.showModal(error)
      return false
    }
    this.upload()
  },

  upload: function() {
    var that = this
    if (adds.name.length == 0 || adds.desc.length == 0 || adds.price.length == 0 || adds.phone.length == 0 || adds.newnessLevel.length == 0) {
      wx.showToast({
        title: '请输入完整！',
        icon: 'loading',
        duration: 1500
      });
    } else {
      if (adds.sessionKey == 0){
        wx.showToast({
          title: '请先登录！',
          icon: 'loading',
          duration: 1500
        });
      }
      else{
        wx.request({
          url: backendServer + '/item/create',
          data: adds,
          method: 'POST',
          header: { // 设置请求的 header
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: function (res) {
            console.log(res)
            if (res.statusCode = 200) {
              wx.showToast({
                title: '已提交发布！',
                duration: 3000
              });
              that.setData({
                adds: '',
              })
            }
          }
        })
      }
      
    }


  },
  //添加图片
  upimg: function() {
    var page = this;
    if (this.data.images.length < 3) {
      wx.chooseImage({
        sizeType: ['original', 'compressed'],
        success: function(res) {
          page.setData({
            images: page.data.images.concat(res.tempFilePaths),
          })
          wx.uploadFile({
            url: backendServer + '/uploadFile',
            filePath: res.tempFilePaths[0],
            name: 'file',
            formData: {
              sessionKey: app.globalData.sessionKey
            },
            success: function(res) {
              console.log(res)
              // TODO res.data是图片完整路径
              page.setData({
                dizhi: page.data.dizhi.concat(res.data),
              })
            },
            fail: function(e) {
              console.log(e)
            }
          })
        }
      })
    } else {
      wx.showToast({
        title: '最多上传三张图片',
        icon: 'loading',
        duration: 2000
      });
    }
  },
  //预览图片
  ylimg: function(e) {
    wx.previewImage({
      current: e.target.dataset.src,
      urls: this.data.images, // 需要预览的图片http链接列表
      success: function(res) {
        console.log(res)

      }
    })
  },
  serverSubmit: function(n) {
    console.log(n)
    news = n.detail.value;
    news.sessionKey = app.globalData.sessionKey
    console.log(news)
    this.load()
  },

  load: function() {
    var that = this
    news.serviceTime = new Date(news.serviceTime).getTime()
    console.log(news.serviceTime)
    if (news.name.length == 0 || news.desc.length == 0 || news.price.length == 0 || news.phoneNumber.length == 0 || news.serviceLocation.length == 0 || news.serviceTime.length == 0) {
      wx.showToast({
        title: '请输入完整！',
        icon: 'loading',
        duration: 1500
      });
    } else {
      wx.request({
        url: backendServer + '/task/create',
        data: news,
        method: 'POST',
        header: { // 设置请求的 header
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function(res) {
          console.log(res)
          if (res.statusCode = 200) {
            wx.showToast({
              title: '已提交发布！',
              duration: 3000
            });
            that.setData({
              news: '',
            })
          }
        }
      })
    }
  },
  //选项卡
  selected: function(e) {
    this.setData({
      selected1: false,
      selected2: false,
      selected: true
    })
  },
  selected1: function(e) {
    this.setData({
      selected: false,
      selected2: false,
      selected1: true
    })
  },
  selected2: function(e) {
    this.setData({

      selected: false,
      selected1: false,
      selected2: true
    })
  }


})