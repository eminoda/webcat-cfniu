var loginService = require('../../../service/loginService.js');
var wxUtil = require('../../../util/wxUtil.js');
Page({
  data: {
    selectTab:'mytrade'
  },
  onLoad: function() {
    console.log('mytrade is running...');
    loginService.isLogin();
  }
});