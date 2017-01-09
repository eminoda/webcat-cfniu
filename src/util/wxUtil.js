var wxUtil = {
  switchTab: function(page) {
    wx.switchTab({
      url: page
    });
  },
  redirectTo: function(page) {
    wx.redirectTo({
      url: page
    })
  },
  navigateTo:function(page){
    wx.navigateTo({
      url: page
    })
  }
};
exports = module.exports = wxUtil;
