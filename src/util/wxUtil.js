var wxUtil = {
  switchTab: function(page) {
    wx.switchTab({
      url: page
    });
  }
};
exports = module.exports = wxUtil;
