# 微信小程序（财富牛）文档
## 脚手架
1. 本地构建
  ```javascript
  npm run build
  ```

2. 生产构建
  ```javascript
  npm run buildpro
  ```

3. 清理项目
  ```javascript
    gulp clean
  ```

## 项目规范
1. 目录结构
  * component ----公共组件
  * lib       ----第三方插件
  * pages     ----小程序模块
  * resources ----资源文件（图片）
  * service   ----服务
  * util      ----基础工具，wxApi封装

2. 字体文件iconfont
  wx不支持iconfont的外部引用个，需要将字体文件convert base64导入。
  demo中包含字体文件的html显示例子，供查阅。