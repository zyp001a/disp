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

	if(!config.log)
		src.log = ">log/"+new Date().toISOString() + ".log";
	else 
		src.log = ">" + config.log;

	if(!config.data)
		src.data="";
	else 
		src.data = config.data;

	if(!config.config)
		src.config= "";
	else
		src.config = config.config;
	if(!config.bin){
		console.error("server must have bin path");
		process.exit(1);
	}
	src.bin = config.bin;
	if(!config.main){
		console.error("server must have main path");
		process.exit(1);
	}
	src.main = config.main;
	var cmd = [src.bin, src.main, src.data, src.config, src.log, "2>&1 &"].join(" ");
	cmd = "cd " + disp.distPath + config.name + " && mkdir -p log && " + cmd;
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
function stopServer(config, fn){
	var pid = fs.readFileSync(disp.distPath + config.name + "/" + "PID");
	pid = pid.toString().replace(/\n\r/g,"");
	process.kill(pid);
}

module.exports.startServer = startServer;
module.exports.stopServer = stopServer;
