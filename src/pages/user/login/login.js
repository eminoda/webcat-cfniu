var util = require('../../../util/const.js');
Page({
  data: {
    image:{
      username:util.icon.noselect.username,
      password:util.icon.noselect.password
    }
  },
  focusInput:function(e){
    this.setData({
      image:temp
    });
  },
  blurInput:function(e){
    console.log(e.target)
    this.setData({
      image:{
        username:util.icon.noselect[e.target.id]
      }
    });
  }
});