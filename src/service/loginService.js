var Promise = require('../util/bluebird/bluebird.min.js');
var constant = require('../util/constant.js');
var loginService = {
  saveLoginInfo: function(obj) {
    return new Promise(function(resolve, reject) {
      var loginInfo = {
        userInfo: encodeURIComponent(obj.userInfo),
        uid: obj.uid,
        nick: obj.nick,
        verify: obj.verify,
        userLever: obj.userLever
      }
      wx.setStorage({
        key: 'loginInfo',
        data: loginInfo,
        success: function(res) {
          resolve({success:true})
        },
        fail: function(res) {
          reject({success:false,resultMsg:constant.respText.SERVER_ERROR})
        }
      })
    })
  }
}
exports = module.exports = loginService;
