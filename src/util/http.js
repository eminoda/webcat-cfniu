var Promise = require('./bluebird/js/release/bluebird.js');
var http = {
  commonRequest: function(form, url, method, that) {
    that.setData({
      loading: true,
      disabled: true
    });
    return new Promise(function(resolve, reject) {
      wx.request({
        url: '[$apiUrl]/api' + url, //仅为示例，并非真实的接口地址
        data: form,
        method: method || 'GET',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function(res) {
          that.setData({
            loading: false,
            disabled: false
          });
          resolve({ data: 123 });
        }
      })
    })
  }
}
exports = module.exports = http;
