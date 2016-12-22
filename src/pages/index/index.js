var http = require('../../util/http.js');
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
      url: '../user/login/login'
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
      url: '[$apiUrl]/api/user/login', //仅为示例，并非真实的接口地址
      data: {
        username:'aaaa',
        password:'a111111'
      },
      method:'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        console.log(res.data)
      }
    })
    http.commonRequest(this.data.loginForm, '/user/getbalance', 'GET', that).then(function(data) {
      console.log(data);
    }, function(err) {
      modal.showTipModal(err.resultMsg);
    });
  }
});
