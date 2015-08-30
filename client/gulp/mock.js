var gulp = require('gulp');

var http = require('http');
var io = require('socket.io');

var fs = require('fs');
var path = require('path');
var glob = require('glob');

var chalk = require('chalk');

function blobsFromGlob(dir, cb) {
  glob(dir, function(err, files){
      if (err) {
        console.error(chalk.red('[MockServer] Failed to glob files for mock server.', err));
        return cb(null, err);
      }

      var blobs = [];
      var c = files.length;
      files.forEach(function(file) {
        fs.readFile(file, 'utf8', function(err, text){
          if (err) {
            console.error(chalk.red('[MockServer] Failed to read mock response files.', err));
            return cb(null, err);
          }

          blobs.push(JSON.parse(text));
          if (0===--c) {
            cb(blobs, null);
          }
        });
      });
  });
}

gulp.task('dev-mock-server', function(cb) {

  var server = http.createServer(function(req, res) {
    res.end('Mock Server');
  });

  // Start mock server
  server.listen(gulp.ports.mock);

  // Setup Socket.io on mock server
  var socket = io.listen(server, {path: '/socket'});

  socket.on('connection', function (client){

    // Helper function for sending mock responses via socket.io
    var sendBlobs = function(dir) {
      // Return a function for ease of use in intervals
      return function() {
        blobsFromGlob(path.resolve(__dirname, dir), function(blobs, err) {
          if (blobs) {
            blobs.forEach(function(blob) {
              client.emit("event", blob);
            });
          }
        });
      };
    };

    // Send all initial responses as real server would
    sendBlobs("./responses/**/*.json")();

    // Setup intervals for mock responses
    var twoMinInterval = setInterval(sendBlobs("./responses/two-mins/**/*.json"), 1000*60*2);
    var thirtySecInterval = setInterval(sendBlobs("./responses/thirty-sec/**/*.json"), 1000*30);

    client.on('disconnect', function () {
      // Cleanup any leftover intervals for this client
      clearInterval(twoMinInterval);
      clearInterval(thirtySecInterval);
    });
  });

  cb();
});
