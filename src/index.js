#!/usr/bin/env node

//console.log(__dirname);
var fs = require('fs');
//var rmdirSync = require('rimraf').sync;
var exec = require('child_process').exec;
var events = require('events');
var emitter = new events.EventEmitter();
var generateSrc = require("./generator").generateSrc;
var startServer = require("./launcher").startServer;
var stopServer = require("./launcher").stopServer;


var node = process.argv[0];
var dispCmd = process.argv[1];
var cmd = process.argv[2];
var noNameCount = 0;
function help(){
	console.log("Usage: " + dispCmd + "[start-cms|stop-cms|help]");
  process.exit(1);
}
if(!cmd){
	help();
}
var disp = {};
var ns = {};
disp.ns = ns;
disp.initConfig = readInitConfig();
formatServerConfig(disp.initConfig.server);
formatSrcConfig(disp.initConfig.src);

checkEnv(function(){
/*
	if(cmd === "start"){
		startAll(disp.server, function(){
			console.log("all finished");
		});
	}
	else if(cmd === "stop"){
		stopAll(disp.server);
	}
	else if(cmd === "restart"){
		stopAll(disp.server, function(){
			startAll(disp.server);
		});
	}
	else if(cmd === "src"){
		src();
	}
*/
	if(cmd === "start-cms"){
		generateSrc(disp.initConfig.src, function(){
			generateSrc(disp.initConfig.server, function(){
				startServer(disp.initConfig.server);
			});
		});
	}
	else if(cmd === "stop-cms"){
		stopServer(disp.initConfig.server);
	}
	else {
		help();
	}
});

function extend(json1, json2){
	if(!json1){
		console.error("cannot extend undefined json");
		process.exit(1);
	}
	for (var key in json2){
    if(!(key in json1))
      json1[key] = json2[key];
  }
	return json1;
}
/*
function readJsonArray(file, defaultJsonArray){
	var json;
	if (fs.existsSync(file))
    json = require(file);
	else
		json = defaultJsonArray;
	return json;
}
*/
function formatName(el, ns){
	if(!el.name){
		console.log("config with no name: " + JSON.stringify(el));
		noNameCount++;
		el.name = "anonymous" + noNameCount.toString();
	}
	else if(ns[el.name]){
		console.error("Duplicate name: " + JSON.stringify(el) + "\n" + JSON.stringify(ns[el.name]));
		process.exit(1);
	}
	ns[el.name]=el;
}
function formatServerConfig(el){
	formatName(el, ns);
	if(!el.root)
		el.root = disp.initConfig.distPath + el.name + "/";
	el.ns= {};
	if (!fs.existsSync(el.root))
		fs.mkdirSync(el.root);
}
function formatSrcConfig(el){
	if(!el.server || !ns[el.server]){
		console.log("src config must have a existing server object");
		process.exit(1);
	}
	var server = ns[el.server];
	formatName(el, server.ns);
	el.server = server;

	if(el.deps){
		el.deps.forEach(function(e){
			el.deps[e]=server.ns[e];
		});
	}
	
	if(!el.root)
		el.root = server.root + el.name + "/";
		
	if (!fs.existsSync(el.root))
		fs.mkdirSync(el.root);
	
}

/*
function readJson(file, defaultJson){
	var json = {};
	if (fs.existsSync(file))
    json = require(file);
	
	extend(json, defaultJson);
	return json;
}
*/
function readInitConfig(){
	
	var defaultInitConfig = {
		server: {
			name: "cms-server",
			type: "node-express",
			port: 8088
		},
		src: {
			name: "cms-src",
			type: "cms",
			server: "cms-server"
		},
		distPath: __dirname + "/../dist/"
	};
	var initConfig = require("./init");
	extend(initConfig, defaultInitConfig);
	global.distPath = initConfig.distPath;
	var config;
/*
	var serverConfig = readJsonArray(initConfig.server.root + 
															 initConfig.src.serverFile, []);
	var srcConfig = readJsonArray(initConfig.server.root + 
																	initConfig.src.srcFile, []);

	formatConfig(serverConfig);
	formatConfig(srcConfig);
*/ 	
	return initConfig;
	
}
function checkEnv(fn){
	if(1){
		fn();
	}
}

function startAll(configArray, fn){
	configArray.forEach(function(config){
		startServer(config.type, function(){
			emitter.emit("serverStarted");
		});
	});
	var count = 0;
	if(configArray.length === 0)
		fn();
	else
		emitter.on("serverStarted", function(){
			count ++;
			if(count == configArray.length) fn();
		});
}
function stopAll(configArray, fn){
}



