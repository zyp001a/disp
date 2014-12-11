#!/usr/bin/env node
var fs =require("fs");

var exec = require("child_process").exec;

require("../app").listen(^^=test.port$$, function(err){
	if(!err){
		console.log("listen to port ^^=test.port$$");
		exec("node_modules/mocha/bin/mocha -R spec test/*_test.js", function(err, stdout, stderr){
			console.log("stdout" + stdout);
			console.log("stderr" + stderr);
			process.exit(0);
		});		
	}
	else{
		console.log(err);
	}
});


