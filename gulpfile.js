var gulp = require('gulp-help')(require('gulp')),
  rename = require('gulp-rename'),
  clean = require('gulp-clean'),
  sequence = require('gulp-sequence'),
  babel = require('gulp-babel'),
  //gulpif = require('gulp-if'),
  replace = require('gulp-replace'),
  sass = require('gulp-sass'),
  proxy = require('http-proxy-middleware'),
  bs = require('browser-sync').create(),
  argv = require('minimist')(process.argv.slice(2)),
  notify = require("gulp-notify"),
  path = require('path'),
  fs = require('fs'),
  colors = require('colors'),
  program = require('commander'),
  Promise = require('bluebird'),
  imagemin = require('gulp-imagemin'),
  uglify = require('gulp-uglify'),
  package = require('./package.json');

// 构建项目
gulp.task('build', '构建项目>>> gulp build', sequence('clean', ['build-image', 'build-extname-wxml', 'build-extname-wxss', 'build-js', 'build-json'], 'watch'));

//监听项目
gulp.task('watch', '项目监听>>> gulp watch', function() {
  gulp.watch(['./src/**/**/*.html', './src/**/*.html', './src/*.html'], ['build-extname-wxml']);
  gulp.watch(['./src/**/**/*.scss', './src/**/*.scss', './src/*.scss'], ['build-extname-wxss']);
  gulp.watch(['./src/**/**/*.js', './src/**/*.js', './src/*.js'], ['build-js']);
  gulp.watch(['./src/**/**/*.json', './src/**/*.json', './src/*.json'], ['build-json']);
  gulp.watch(['./src/resources/**'], ['build-image']);
});

// 清理项目
gulp.task('clean', '清理项目>>> gulp clean', function() {
  return gulp.src(['./dist/', './*.log'])
    .pipe(clean());
});

gulp.task('add', '添加文件>>> gulp add --dir=./src/pages/test --name=test', function() {
  var dir = argv.dir;
  var name = argv.name;
  if (!dir || !name) {
    printError('参数错误，例如：gulp add --dir=./src/pages/test --name=test');
  } else {
    createDir(dir).then(function() {
      var filesFun = [];
      console.log('待添加文件==>>'.green + colors.green(package.gulpConfig.wxExt));
      for (var ext of package.gulpConfig.wxExt) {
        filesFun.push(createFile(dir, '/' + name + ext));
      }
      Promise.all(filesFun).then(function() {
        return true;
      })
    }, function(err) {
      printError(err);
    })
  }
});

// 本地开发服务模拟
gulp.task('server', '启动服务>>>todo', function() {
  var env = argv.env || 'dev';
  var httpUrl = package.gulpConfig[env].httpUrl;
  console.log('代理地址：' + httpUrl);
  // 代理配置2
  var context = ['/api/**'],
    options = {
      target: 'http://192.168.1.98:8080',
      pathRewrite: {
        '^/api/': '/' // rewrite path 
      }
    };
  bs.init({
    server: {
      baseDir: ['dist/']
    },
    host: "127.0.0.1",
    middleware: [proxy(context, options)],
    port: 8888,
    open: "false",
    //browser: "chrome"
  });
  console.log(colors.yellow('服务已启动==>http://127.0.0.1:8888'));
});

gulp.task('build-image', function() {
  return gulp.src('./src/resources/image/**')
    //.pipe(imagemin())
    .pipe(gulp.dest('dist/resources/image'));
});
gulp.task('build-font', function() {
  return gulp.src('./src/resources/font/**')
    //.pipe(imagemin())
    .pipe(gulp.dest('dist/resources/font'));
});
// build wx js
gulp.task('build-js', function() {
  var env = argv.env || 'dev';
  var httpUrl = package.gulpConfig[env].httpUrl;
  var apiUrl = package.gulpConfig[env].apiUrl;
  return gulp.src(['./src/**/**/**/*.js', './src/**/**/*.js', './src/**/*.js', './src/*.js'])
    .pipe(replace('[$httpUrl]', httpUrl))
    .pipe(replace('[$apiUrl]', apiUrl))
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
  var env = argv.env || 'dev';
  var httpUrl = package.gulpConfig[env].httpUrl;
  var apiUrl = package.gulpConfig[env].apiUrl;
  return gulp.src(['./src/**/**/*.scss', './src/**/*.scss', './src/*.scss'])
    .pipe(replace('[$httpUrl]', httpUrl))
    .pipe(replace('[$apiUrl]', apiUrl))
    .pipe(sass().on('error', sass.logError))
    .pipe(rename(function(path) {
      path.extname = '.wxss';
    }))
    .pipe(gulp.dest('./dist'));
});
// 创建目录
function createDir(dir) {
  try {
    return new Promise(function(resolve, reject) {
      if (!fs.existsSync(dir)) {
        console.log('开始创建路径==>' + dir);
        var pathtmp;
        dir.split('/').forEach(function(dirname) {
          if (pathtmp) {
            pathtmp = path.join(pathtmp, dirname);
          } else {
            pathtmp = dirname;
          }
          if (!fs.existsSync(pathtmp)) {
            console.log('开始创建路径==>' + pathtmp);
            if (!fs.mkdirSync(pathtmp)) {
              return false;
            }
          }
        });
      } else {
        fs.stat(dir, function(err, stats) {
          reject(dir + '目录已存在');
          console.log(stats);
        })
      }
      resolve();
    })
  } catch (e) {
    printError(e);
    reject();
  }
}
// 创建文件
function createFile(path, name) {
  try {
    console.log('开始创建==>'.green + path.green + name.green);
    return fs.writeFileSync(path + name);
  } catch (e) {
    printError(e);
  }
}
// 打印错误日志
function printError(err) {
  console.error(colors.red(err));
  return false;
}
