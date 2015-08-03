var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

gulp.task('lint', function() {
  return gulp.src(['./src/**/*.{js,jsx}', '!src/**/__tests__/*.{js,jsx}'])
    .pipe($.eslint())
    .pipe($.eslint.format())
    .pipe($.eslint.failOnError());
});
