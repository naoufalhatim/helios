/**
 * Clean /public folder
 */
var gulp = require('gulp');
var del = require('del');

gulp.task('clean:dist', function(cb) {
  del(['public/**/*'], cb);
});
