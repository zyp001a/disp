var fs = require("fs");
//var exec = require('child_process').exec;
//var spawn = require('child_process').spawn;
var FFI = require("node-ffi");
var libc = new FFI.Library(null, {
  "system": ["int32", ["string"]]
});
var system = libc.system;
function startServer(config, fn){
	var src = {};
  var mod = require("./"+config.type);
	if(mod.start)
		src = mod.start(config);
	else
		src = mod;

	if(!src.log){
		src.log = ">";
	}
	src.log += "log/"+new Date().toISOString() + ".log";
	if(!src.data){
		src.data="";
	}
	if(!src.config){
		src.config= "";
	}
	if(!src.bin){
		console.error("server must have bin path");
		process.exit(1);
	}
	if(!src.main){
		console.error("server must have main path");
		process.exit(1);
	}
	
	var cmd = [src.bin, src.main, src.data, src.config, src.log, "2>&1 &"].join(" ");
	cmd = "cd " + global.distPath + config.name + " && mkdir -p log && " + cmd;
	console.log(cmd);
	system(cmd);
/*
	exec(cmd,function(err, stdout, stderr){
		if(err){
			console.error(cmd + "\nerror:\n"+ err);
			process.exit(1);
		}
		if(fn)
			fn();
	});
*/
}

module.exports.startServer = startServer;
