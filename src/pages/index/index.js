//获取应用实例
var app = getApp();
Page({
  data: {
    motto: 'Hello World',
    userInfo: {}
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../trade/dotrade/dotrade'
    });
  },
  onLoad: function() {
    console.log('onLoad');
    var that = this;
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      });
    });
    wx.request({
      url: 'https://192.168.1.98/api/trade/getProduct.api', //仅为示例，并非真实的接口地址
      data: {
        pzType:0
      },
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        console.log(res.data)
      }
    })
  }
});
