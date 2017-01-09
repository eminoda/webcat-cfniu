var loginService = require('../../../service/loginService.js');
var wxUtil = require('../../../util/wxUtil.js');
Page({
  data: {
    selectTab:'dotrade'
  },
  onLoad: function() {
    console.log('dotrade is running...');
    loginService.isLogin();
  }
});