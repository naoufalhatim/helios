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

    eslint: {
      target: ['js/*.js', 'js/**/*.js'],
    },

    watch: {
      scripts: {
        files: ['js/*.js', 'js/**/*.js'],
        tasks: ['eslint'],
        options: {
          spawn: false,
        },
      },
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
  grunt.loadNpmTasks('grunt-eslint');

  grunt.registerTask('default', ['eslint', 'watch']);
  grunt.registerTask('build', ['browserify:build']);
};
