/**
 * Require all tasks in /tasks folder
 */
var requireDir = require("require-dir");

requireDir("./gulp", { recurse: true });
