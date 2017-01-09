var constant = require('../../util/constant.js');
var http = require('../../service/httpService.js');
var modal = require('../../util/modal.js');
var wxUtil = require('../../util/wxUtil.js');
//获取应用实例
var app = getApp();
Page({
  data: {
    loginInfo: {},
    userInfo: {},
    banners: [{
      imgUrl: 'http://m.cfniu.com/resources/images/newIndex/carousel1.jpg',
      navUrl: ''
    }, {
      imgUrl: 'http://m.cfniu.com/resources/images/newIndex/carousel2.jpg',
      navUrl: ''
    }, {
      imgUrl: 'http://m.cfniu.com/resources/images/newIndex/carousel3.jpg',
      navUrl: ''
    }],
    index: [{
      title: '按天配资',
      desc: '短线神器，按天操盘，自由灵活',
      icon: 'icon-tianzhuanhuan'
    }, {
      title: '按月配资',
      desc: '炒股利器，一个涨停，大赚60%',
      icon: 'icon-yuezhuanhuan'
    }, {
      title: '互惠配资',
      desc: '互惠互利，零费用，无压力',
      icon: 'icon-mian'
    }, {
      title: '极惠配资',
      desc: '比融资融券，更简单，更便宜',
      icon: 'icon-jizhuanhuan'
    }]
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../user/login/login'
    });
  },
  getbalance:function(){
    var that = this;
    http.commonRequest({}, '/user/getbalance', 'POST', that, null).then(function(data) {
      console.log(data);
    }, function(err) {
      modal.showTipModal(err.resultMsg);
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
    // app.getUserInfo(function(userInfo) {
    //   //更新数据
    //   that.setData({
    //     userInfo: userInfo
    //   });
    // });
    var loginInfo = wx.getStorageSync('loginInfo');
    if (loginInfo) {
      console.log(loginInfo);
      that.setData({
        loginInfo: loginInfo
      });
    }else{
      wxUtil.navigateTo('../user/login/login');
    }
  }
});
