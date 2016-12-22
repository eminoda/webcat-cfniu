exports = module.exports = {
  // 图标
  icon: {
    select: {
      username: '/resources/image/iconfont/用户2.png',
      password: '/resources/image/iconfont/密码2.png'
    },
    noselect: {
      username: '/resources/image/iconfont/用户.png',
      password: '/resources/image/iconfont/密码.png'
    }
  },
  // 响应文案
  respText: {
    NOT_FOUND: '系统找不到该资源',
    SERVER_ERROR: '服务器异常，请稍后再试',
    LOGIN_SUCCESS: '登录成功',
    LOGIN_FAIL: "用户名或密码错误",
  },
  // http状态码
  httpCode: {
    'NOT_FOUND': 404,
    'Server_Error': 500,
    'OK': 200
  },
  // 表单验证文案
  validatorText: {
    username: '请输入用户名',
    password: '请输入密码',
    other:'输入有误，请重新输入'
  }
};
