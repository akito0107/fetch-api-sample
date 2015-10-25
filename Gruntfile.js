'use strict';

module.exports = function (grunt) {
  require('jit-grunt')(grunt);

  grunt.initConfig({
    nodemon: {
      dev: {
        script: './src/index.js',
        options: {
          watch: ['./src'],
          ignore: ['./src/front', './src/public'],
          ext: 'js'
        }
      }
    },
    eslint: {
      options: {
        force: true,
        config: 'eslint.json',
        ignore: ['./src/public/js/*.js']
      },
      target: ['./src/**/*.js']
    },
    webpack: {
      dev: {
        entry: './src/front/js/index.js',
        output: {
          path: './src/public/js',
          filename: 'dist.js'
        },
        resolve: {
          extensions: ['', '.js']
        },
        module: {
          loaders: [
            {
              test: /\.js$/,
              exclude: /node_modules/,
              loader: 'babel-loader'
            }
          ]
        }
      }
    },
    watch: {
      files: ['./src/front/js/**/*.js'],
      tasks: ['webpack:dev']
    }
  });
}
