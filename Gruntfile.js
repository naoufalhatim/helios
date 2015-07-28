var fs = require('fs');

module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    browserify: {
      dev: {
        options: {
          debug: true,
          transform: ['babelify']
        },
        files: {
          'public/js/bundle.js': 'js/main.js'
        }
      },
      build: {
        options: {
          debug: false,
          transform: ['babelify']
        },
        files: {
          'public/js/bundle.js': 'js/main.js'
        }
      }
    },

    watch: {
      browserify: {
        files: ['js/*.js', 'js/**/*.js'],
        tasks: ['browserify:dev']
      },
      options: {
        nospawn: true
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browserify');

  grunt.registerTask('default', ['watch']);
  grunt.registerTask('build', ['env:build', 'browserify:build']);
};
