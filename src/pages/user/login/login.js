var util = require('../../../util/const.js');
var http = require('../../../util/http.js');

Page({
  data: {
    'usernameIcon': util.icon.noselect.username,
    'passwordIcon': util.icon.noselect.password
  },
  focusInput: function(e) {
    this.setData({
      [e.target.id + 'Icon']: util.icon.select[e.target.id] })
  },
  blurInput: function(e) {
    this.setData({
      [e.target.id + 'Icon']: util.icon.noselect[e.target.id] })
  },
  login: function(e) {
    var that = this;
    http.commonRequest({
      username:'18702141422',
      password:'a111111'
    },'/user/login','POST',that).then(function(data){
      console.log(data);
    })
  }
});
