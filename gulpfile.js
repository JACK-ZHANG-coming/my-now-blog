const gulp = require('gulp');
const sftp = require('gulp-sftp-up4');

// 通过 gulp 创建名称为 'upload' 的任务
gulp.task('upload', function () {
  return gulp.src('build' + '/**')
    .pipe(sftp({
      host: '124.223.115.241',
      user: '---',
      pass: 'FrkBeksXJdsjX336',
      port: '2121',
      remotePath: '/',
      timeout:99999,
    }));
});