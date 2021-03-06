/*
 * grunt-conditional-deploy
 * https://github.com/matiasdecarli/grunt-conditional-deploy
 *
 * Copyright (c) 2016 Matias De Carli
 * Licensed under the MIT license.
 */

'use strict';

var async = ('async');

module.exports = function(grunt) {

	var spawn = require("child_process").spawn,
	        donePromise;

	var _ = require('lodash');

    var outputData = function (obj) {
        var i = 0;
    var commit = grunt.util.spawn({
            cmd: "git",
			args: _.compact(['diff', '--name-only', obj.options().commit_from, obj.options().commit_to]),
        }, function(error, result, code) {
        	if (error) grunt.fail.fatal(error);

            var files = result.stdout.split(obj.options().separator);

            if (_.intersection(obj.filesSrc,files).length!==0) runTask(obj.data.options.target, files);

            donePromise();
        });
    };

    function runTask(taskName, filesChanged){
    	grunt.task.run(taskName);
        console.log('fired task: ', taskName, ' . files changed: ', filesChanged);
    }

  grunt.registerMultiTask('conditional_deploy', 'A plugin to conditionally run tasks based on files on the last commit', function() {
	 	donePromise = this.async();
	 	outputData(this);
  });
};
