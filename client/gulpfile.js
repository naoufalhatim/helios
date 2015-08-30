/**
 * Require all tasks in /tasks folder
 */
var requireDir = require("require-dir");

var gulp = require("gulp");

gulp.ports = {
  proxy: 3000,
  client: 3001,
  mock: 3002,
  server: 8989
};

requireDir("./gulp", { recurse: true });
