// 校验规则顺序
var order = {
  loginValid: ['username', 'password']
};

var validator = {
  // 通用校验
  commonValidator: function(obj, valid) {
    // 有规则
    if (valid) {
      for (var i = 0; i < order[valid].length; i++) {
        if (!obj[order[i]]) {
          return {
            success: false,
            name: order[valid][i]
          }
        }
      }
    } else {
      for (var key in obj) {
        if (!obj[key]) {
          return {
            success: false,
            name: key
          }
        }
      }
    }
    return {
      success: true
    };
  }
}
exports = module.exports = validator;
