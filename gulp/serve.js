var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var webpackConfig = require('../webpack.config.js');

gulp.task('serve', function(cb) {
  var bundler = webpack(webpackConfig);

  var devServer = {
    hot: true,
    inline: true,
    historyApiFallback: true,
    host: 'localhost',
    port: process.env.PORT || 3000,
    contentBase: './src',
    stats: {
      colors: true
    }
  };

  new WebpackDevServer(bundler, devServer).listen(3000, 'localhost', function(err) {
    if(err) {
      throw new $.util.PluginError('webpack-dev-server', err);
    }
    $.util.log('[webpack-dev-server]', 'http://localhost:8080/webpack-dev-server/index.html');
    cb();
  });
});

