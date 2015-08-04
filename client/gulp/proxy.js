var gulp = require('gulp');

var paths = gulp.paths;
var ports = gulp.ports;

var chalk = require('chalk');

var http = require('http');

var httpProxy = require('http-proxy');

function proxyServerInit() {
  // Proxy for static asset requests and browser sync socket
  var proxyWeb = new httpProxy.createProxyServer({
    target: {
      host: 'localhost',
      port: ports.client
    }
  });

  proxyWeb.on('error', function (error, req, res){
    res.writeHead(500, {
      'Content-Type': 'text/plain'
    });
    console.error(chalk.red('[ProxyClient]'), error);
  });

  // Proxy for server requests and server socket
  var proxyServer = new httpProxy.createProxyServer({
    target: {
      host: 'localhost',
      port: ports.server
    }
  });

  proxyServer.on('error', function (error, req, res){
    res.writeHead(500, {
      'Content-Type': 'text/plain'
    });
    if (error.code != "ECONNREFUSED") {
      console.error(chalk.red('[ProxyServer]'), error);
    }
  });

  // Create basic http server to use as proxy
  var server = http.createServer(function (req, res) {
    var staticExtensions = /\.(html|css|js|png|jpg|jpeg|gif|ico|xml|rss|txt|eot|svg|ttf|woff|cur|woff2|map)\??/.test(req.url);
    var indexPage = req.url === '/';
    var webpackSocket = /^\/socket.io/.test(req.url);

    if (staticExtensions || indexPage || webpackSocket) {
      proxyWeb.web(req, res);
    } else {
      proxyServer.web(req, res);
    }
  });

  // Listen to the `upgrade` event and proxy the socket
  server.on('upgrade', function (req, socket, head) {
    var webpackSocket = /^\/socket.io/.test(req.url);
    if (webpackSocket) {
      proxyWeb.ws(req, socket, head);
    } else {
      proxyServer.ws(req, socket, head);
    }
  });

  // Serve it up
  server.listen(ports.proxy);
}

gulp.task('serve', ['webpack-dev-server'], function() {
  proxyServerInit();
});
