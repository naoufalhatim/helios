var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var webpackConfig = require('../webpack.config.js');

gulp.task('webpack-dev-server', function(cb) {
  var bundler = webpack(webpackConfig);

  var devServer = {
    hot: true,
    inline: true,
    historyApiFallback: true,
    host: 'localhost',
    port: gulp.ports.client,
    contentBase: './src',
    stats: {
      colors: true
    }
  };

  new WebpackDevServer(bundler, devServer).listen(devServer.port, 'localhost', function(err) {
    if(err) {
      throw new $.util.PluginError('webpack-dev-server', err);
    }
    $.util.log('[webpack-dev-server]', 'http://localhost:' + devServer.port + '/webpack-dev-server/index.html');
    $.util.log('Server started at http://localhost:' + devServer.port);
    cb();
  });
});

