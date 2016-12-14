var gulp = require('gulp'),
  rename = require('gulp-rename'),
  clean = require('gulp-clean'),
  sequence = require('gulp-sequence'),
  //gulpif = require('gulp-if'),
  replace = require('gulp-replace'),
  sass = require('gulp-sass'),
  proxy = require('http-proxy-middleware'),
  bs = require('browser-sync').create(),
  package = require('./package.json');

// 构建项目
gulp.task('build', sequence('clean', ['build-extname-wxml', 'build-extname-wxss', 'build-js', 'build-json'],'watch'));

//监听项目
gulp.task('watch', function() {
  gulp.watch(['./src/**/**/*.html', './src/**/*.html', './src/*.html'], ['build-extname-wxml']);
  gulp.watch(['./src/**/**/*.scss', './src/**/*.scss', './src/*.scss'], ['build-extname-wxss']);
  gulp.watch(['./src/**/**/*.js', './src/**/*.js', './src/*.js'], ['build-js']);
  gulp.watch(['./src/**/**/*.json', './src/**/*.json', './src/*.json'], ['build-json']);
});
// 清理项目
gulp.task('clean', function() {
  return gulp.src(['pages', './*.log', './app.wxss', './app.json', './app.js', './app.wxml'], { read: false })
    .pipe(clean());
});

// 本地开发服务模拟
gulp.task('server', ['build'], function() {
  // 代理配置2
  var context = ['**/*.api*', '/common/**'],
    options = {
      target: "http://192.168.1.87:9080",
    };
  // create the proxy 
  var proxy = proxyMiddleware(context, options);
  bs.init({
    server: {
      baseDir: ['dev/', '../com.com.9niu.api/sit/']
    },
    host: "dev.9niutest.com",
    middleware: [proxy],
    open: "external",
    browser: "chrome"
  });
});

// build wx js
gulp.task('build-js', function() {
  return gulp.src(['./src/**/**/*.js', './src/**/*.js', './src/*.js'])
    .pipe(replace('[$apiUrl]', package.gulpConfig.apiUrl))
    .pipe(gulp.dest('./dist'));
});
// build wx json
gulp.task('build-json', function() {
  return gulp.src(['./src/**/**/*.json', './src/**/*.json', './src/*.json'])
    .pipe(gulp.dest('./dist'));
});
// build wx wxml
gulp.task('build-extname-wxml', function() {
  return gulp.src(['./src/**/**/*.html', './src/**/*.html', './src/*.html'])
    .pipe(rename(function(path) {
      path.extname = '.wxml';
    }))
    .pipe(gulp.dest('./dist'));
});
// build wx css
gulp.task('build-extname-wxss', function() {
  return gulp.src(['./src/**/**/*.scss', './src/**/*.scss', './src/*.scss'])
    .pipe(sass().on('error', sass.logError))
    .pipe(rename(function(path) {
      path.extname = '.wxss';
    }))
    .pipe(gulp.dest('./dist'));
});
