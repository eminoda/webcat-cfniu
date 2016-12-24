var loginService = require('../../../service/loginService.js');
Page({
  onLoad: function() {
    console.log(111);
    loginService.isLogin();
  }
});