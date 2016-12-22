var constant = require('../../util/constant.js');
var http = require('../../util/http.js');
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
  onLoad: function() {

    console.log('+');
    console.log(encodeURIComponent('+'));

    console.log('onLoad');
    var that = this;
    var test = "AYwBeJktu4ndTexfPY9/a26rCQ7m2Ywq/CI6rq1jIw2XNJrVBj/LvskV2s3XUDLLnwIynMb8cwDJkRBnEyDMPFnGAklsaoQn6CvJbAv6LfrKnAURjdC5+SVASxvv3zsQc/bcPLOPgJ8+kMgLoCZ8Rm8LzjM1EgvCqpVughCq2dT1Xbo0CQUCnTm2NT/lDCB2vhy2+NJfjXjqhl6PYXdBc6SBexEiIIt1EiwbsEv/ITYURKakCdksLekUwwKiHqSEqiEVdcUcqbTJEEkL/x8z/M9cG3Mv92/U1fDQPimBXkBh4L0QrLzZlpq0/zsf2rulP1WG16QGAZC4sM9RDL0VzUWB2Ltb+lmU/cUoh1h3L4oJjb7679GGXTAXaFJMr65kQAASofbjKTwYv/ZxdfHI4yc6TH+pu1VUxKa62bQUvo33Zy23j7SBGsdV8Pq/QejAqUhhg503koNprdEMryPHQKY5RjVKPKyq6dx9/4SfHkitgKs/1SFtteH00ndLkFyj0wYHn3MhE3NYWeDFHx/0naOrCw\u003d\u003d";
    console.log(test);
    var test1 = encodeURIComponent(test);
    console.log(test1);
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      });
    });

    wx.request({
      url: '[$httpUrl][$apiUrl]/user/getbalance', //仅为示例，并非真实的接口地址
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        "uid": "46466517220509",
        "nick": "YWFhYQ\u003d\u003d",
        "verify": "40816d2ff0cc45335ff9ccfa9d61c086",
        "userInfo": test1,
        "userLever": "4"
      },
      success: function(res) {
        console.log(res.data);
      }
    });
  }
});
