/*
 * grunt-conditional-deploy
 * https://github.com/matiasdecarli/grunt-conditional-deploy
 *
 * Copyright (c) 2016 Matias De Carli
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Configuration to be run (and then tested).
    'conditional_deploy': {
      options:{
        separator: '\n',
        commit: 'HEAD~1'  //target everything after this commit
      },
      frontend:{
        options:{
          target: 'frontend'
        },
        files: [{
          src: [
            'src/**'
          ],
          dest: '/',
          expand: true,
          filter: 'isFile'
        }]
      },
      backend:{
        options:{
          target: 'backend'
        },
        files: [{
          src: [
            'lib/**'
          ],
          dest: '/',
          expand: true,
          filter: 'isFile'
        }]
      }
    },
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // By default, lint and run all tests.
  grunt.registerTask('default', ['conditional_deploy']);

};
