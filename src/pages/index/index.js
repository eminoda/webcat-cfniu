var constant = require('../../util/constant.js');
var http = require('../../service/httpService.js');
var modal = require('../../util/modal.js');
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
  // getbalance: function() {
  //   var that = this;
  //   wx.request({
  //     url: '[$httpUrl][$apiUrl]/user/getbalance', //仅为示例，并非真实的接口地址
  //     method: 'GET',
  //     header: {
  //       'content-type': 'application/x-www-form-urlencoded',
  //       "uid": that.data.loginInfo.uid,
  //       "nick": that.data.loginInfo.nick,
  //       "verify":that.data.loginInfo.verify,
  //       "userInfo": that.data.loginInfo.userInfo,
  //       "userLever": that.data.loginInfo.userLever

  //     },
  //     success: function(res) {
  //       console.log(res.data);
  //     }
  //   });
  // },
  onLoad: function() {
    var that = this;
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      });
    });
    // var loginInfo = wx.getStorageSync('loginInfo');
    // that.setData({
    //     loginInfo: loginInfo
    //   });
    // console.log(loginInfo);
  }
});
