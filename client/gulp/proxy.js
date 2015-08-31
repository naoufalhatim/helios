var gulp = require('gulp');

var paths = gulp.paths;
var ports = gulp.ports;

var chalk = require('chalk');

var http = require('http');

var httpProxy = require('http-proxy');

function proxyServerInit() {
  var useFallbackServer = false;

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

    if (error.code === "ECONNREFUSED") {
      console.log(chalk.red('[ProxyServer] Failed to connect to server. Using fallback mock server'));
      useFallbackServer = true;
    } else {
      console.error(chalk.red('[ProxyServer]'), error);
    }
  });

  // Proxy for mock server requests and mock server socket
  var proxyMock = new httpProxy.createProxyServer({
    target: {
      host: 'localhost',
      port: ports.mock
    }
  });

  proxyMock.on('error', function (error, req, res){
    res.writeHead(500, {
      'Content-Type': 'text/plain'
    });
    if (error.code === "ECONNREFUSED") {
      console.log(chalk.red('[ProxyMock] Failed to connect to mock server.'));
    } else {
      console.error(chalk.red('[ProxyMock]'), error);
    }
  });

  // Create basic http server to use as proxy
  var server = http.createServer(function (req, res) {
    var staticExtensions = /\.(html|css|js|png|jpg|jpeg|gif|ico|xml|rss|txt|eot|svg|ttf|woff|cur|woff2|map)\??/.test(req.url);
    var indexPage = req.url === '/';
    var webpackSocket = /^\/socket.io/.test(req.url);

    if (staticExtensions || indexPage || webpackSocket) {
      proxyWeb.web(req, res);
    } else if (!useFallbackServer) {
      proxyServer.web(req, res);
    } else {
      proxyMock.web(req, res);
    }
  });

  // Listen to the `upgrade` event and proxy the socket
  server.on('upgrade', function (req, socket, head) {
    var webpackSocket = /^\/socket.io/.test(req.url);
    if (webpackSocket) {
      proxyWeb.ws(req, socket, head);
    } else if (!useFallbackServer) {
      proxyServer.ws(req, socket, head);
    } else {
      proxyMock.ws(req, socket, head);
    }
  });

  // Serve it up
  server.listen(ports.proxy);
}

gulp.task('serve', ['dev-mock-server', 'webpack-dev-server'], function() {
  proxyServerInit();
});
