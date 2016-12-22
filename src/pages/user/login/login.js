var constant = require('../../../util/constant.js');
var http = require('../../../util/http.js');
var modal = require('../../../util/modal.js');
var wxUtil = require('../../../util/wxUtil.js');
var loginService = require('../../../service/loginService.js');

Page({
  data: {
    usernameIcon: constant.icon.noselect.username,
    passwordIcon: constant.icon.noselect.password,
    loginForm: {
      username: null,
      password: null
    }
  },
  focusInput: function(e) {
    this.setData({
      [e.target.id + 'Icon']: constant.icon.select[e.target.id]
    });
  },
  blurInput: function(e) {
    this.setData({
      [e.target.id + 'Icon']: constant.icon.noselect[e.target.id]
    });
  },
  saveForm: function(e) {
    this.data.loginForm[e.target.id] = e.detail.value;
    this.setData({
      loginForm: this.data.loginForm
    });
  },
  login: function(e) {
    var that = this;
    http.commonRequest(this.data.loginForm, '/user/login', 'POST', that, 'loginValid').then(function(data) {
      if (data.success) {
        // modal.showTipModal('登录成功');
        loginService.saveLoginInfo(data).then(function(data){
          wxUtil.switchTab('../../index/index'); 
        },function(err){
          modal.showToastModal(err.resultMsg,'loading');
        })
        
      } else {
        modal.showTipModal(constant.respText.LOGIN_FAIL);
      }
    }, function(err) {
      modal.showTipModal(err.resultMsg);
    });
  },
  onLoad: function() {
    wx.setStorage({
        key: 'loginInfo',
        data: "1111"
      })
  }
});
