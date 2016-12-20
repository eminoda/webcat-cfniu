var modal = {
  // tip
  showTipModal: function(data) {
    wx.showModal({
      title: "提示",
      content: data || "",
      showCancel: false, //是否显示取消按钮，默认为 true
      success: function(res) {}
    });
  },
  // 番茄提示框
  showToastModal: function(title, icon, time) {
    wx.showToast({
      title: title || '成功',
      icon: icon || 'success',
      duration: time || 2000
    })
  }
};
exports = module.exports = modal;
