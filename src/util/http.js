var Promise = require('./bluebird/bluebird.min.js');
var constant = require('./constant.js');
var validator = require('./validator.js');
var modal = require('./modal.js');

var http = {
  commonRequest: function(form, url, method, that,valid) {
    var valid = validator.commonValidator(form,valid);
    return new Promise(function(resolve, reject) {
      if (!valid.success) {
        reject({
          resultMsg: constant.validatorText[valid.name]||constant.validatorText[valid.other]
        })
      } else {
        that.setData({
          loading: true,
          disabled: true
        });
        wx.request({
          url: '[$apiUrl]/api' + url, //仅为示例，并非真实的接口地址
          data: form,
          method: method || 'GET',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: function(res) {
            // 200
            if (res.statusCode === constant.httpCode.OK) {
              if (res.data.status == 'true' || res.data.success) {
                res.data.success = true;
              } else {
                res.data.success = false;
              }
              resolve(res.data);
            } else if (res.statusCode === constant.httpCode.NOT_FOUND) {
              // 404
              reject({
                statusCode: res.statusCode,
                resultMsg: constant.respText.NOT_FOUND
              });
            } else {
              // 500 其他
              reject({
                statusCode: res.statusCode,
                resultMsg: constant.respText.Server_Error
              });
            }
          },
          fail: function(res) {
            reject({
              statusCode: res.statusCode,
              resultMsg: constant.respText.Server_Error
            });
          },
          complete: function(res) {
            that.setData({
              loading: false,
              disabled: false
            });
          }
        });
      }
    });
  }
};
exports = module.exports = http;
