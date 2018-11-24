Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '名字',
    rightImg: '../../../images/leaseImg/1.jpg',
    lists: [
      //所有发送的信息
    ],
    scrollTop: 100,//设置滚动条到顶部的距离  
    centence: ''  //获取到的输入框的内容

  },

  //点击发送以后的事件处理函数  
  addItemFn: function () {
    var { lists } = this.data;   //  创建一个变量lists
    var newData = { value: this.data.centence };   //创建一个对象，{value:每次单条输入框中发送的值}
    lists.push(newData);    //点击以后输入框中的值push到list数组种，
    this.setData({
      lists: lists,//赋值给this.data.list,wxml去循环这个lists
      centence: '', //点击发送以后，清空下面输入框的value
      text:''
    })

    console.log(lists)
  },
  inputFunc: function (e) {
    this.setData({
      centence: e.detail.value
    })
  }
})