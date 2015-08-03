/**
 * Process files via webpack
 */
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var path = require('path');

var webpack = require('webpack');
var distConfig = require('../webpack.dist.config.js');

gulp.task('build', ['clean:dist'], function(cb) {
  webpack(distConfig, function(err, stats) {
    if(err) { throw new $.PluginError('webpack', err); }

    $.util.log('[webpack]', stats.toString());

    // Strip dev dependencies from index.html
    gulp.src(path.resolve(process.cwd(), 'public/index.html'))
      .pipe($.htmlReplace({
        'dev-only': ''
      }))
      .pipe(gulp.dest('./public'));

    cb();
  });
});
