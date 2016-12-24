var Promise = require('../lib/es6-promise.js').Promise;
var constant = require('../util/constant.js');
var wxUtil = require('../util/wxUtil.js');
var loginService = {
  /** 
   * [saveLoginInfo 记录登录信息]
   * @Author   ShiXingHao
   * @DateTime 2016-12-23
   */
  saveLoginInfo: function(obj) {
    return new Promise(function(resolve, reject) {
      var loginInfo = {
        userInfo: encodeURIComponent(obj.userInfo),
        uid: obj.uid,
        nick: obj.nick,
        verify: obj.verify,
        userLever: obj.userLever
      };
      wx.setStorage({
        key: 'loginInfo',
        data: loginInfo,
        success: function() {
          resolve({success:true});
        },
        fail: function() {
          reject({success:false,resultMsg:constant.respText.SERVER_ERROR});
        }
      });
    });
  },
  isLogin:function(){
    if(!wx.getStorageSync('loginInfo')){
      wxUtil.switchTab('../user/login/login');
    }
  }
};
exports = module.exports = loginService;
