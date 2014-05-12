#!/usr/bin/env node
/*
extended config:
{
 "name": "example",
 "type": "cms",
 "deps": [type1, type2],
 "rels": [{},{}],
 "env": {
 }
 "status": 0|1|2
}
*/
//console.log(__dirname);
var fs = require('fs');
//var rmdirSync = require('rimraf').sync;
var exec = require('child_process').exec;
var events = require('events');
var emitter = new events.EventEmitter();


var node = process.argv[0];
var dispCmd = process.argv[1];
var cmd = process.argv[2];
var modName = process.argv[3];

function help(){
	console.log("Usage: " + dispCmd + "[gen|start|stop|help] [module name]");
  process.exit(1);
}
if(!cmd){
	help();
}
var disp = {};
var ns = [];
var entrances = [];
var noNameCount = 0;
global.disp = disp;
disp.ns = ns;
var cmdPool = {};
cmdPool.gen = require("./generator").generateSrc;
cmdPool.gen.set = ns;
var launcher = require("./launcher");
cmdPool.start = launcher.startServer;
cmdPool.stop = launcher.stopServer;
cmdPool.start.set = entrances;
cmdPool.stop.set = entrances;

disp.distPath = __dirname + "/../dist/";
if (!fs.existsSync(disp.distPath))
	fs.mkdirSync(disp.distPath);

disp.entrances = entrances;
initFromConfig();

checkEnv(function(){
	if(cmd != "help" && cmdPool[cmd]){
		if(modName)
			cmdPool[cmd](ns[modName]);
		else
			cmdPool[cmd].set.forEach(function(config){
				cmdPool[cmd](config);
			});
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
		else if(key === "env" || key === "deps"){
			json1[key] = extend(json1[key], json2[key]);
		}
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
function extendConfig(config){
	if(config.status >= 1){
		return;
	}
	if(!config.type){
		console.error("Module type is not defined");
    process.exit(1);
	}

	if(!config.name){
    config.name = config.type;
  }
  else if(ns[config.name]){
    console.error("Duplicate name: " + JSON.stringify(config) + "\n" + JSON.stringify(ns[config.name]));
    process.exit(1);
  }
//	console.log(config.type);
	var defaultConfig = require("./"+config.type);
	config = extend(config, defaultConfig);
  ns[config.name]=config;
  ns.push(config);
	if(config.main){
		entrances.push(config);
	}
	config.children = [];
	config.status = 1;
}
function extendDeps(config){
	if(config.deps)
//		console.log(config.deps);
		for (var key in config.deps){
			extendConfig({
				"name": config.deps[key],
				"type": key
			});
		};

}
function applyConfig(config){
	if(config.rels){
		config.rels.forEach(function(rel){
			if(rel.parent){
				ns[rel.parent].env.children.push(config.name);
			}
			var key;
			if(rel.with){
				if(rel.append){
					rel.pass.forEach(function(varName){
						ns[rel.with].env[varName] += ("\n" + config[varName]);
					});
				}
				if(rel.pass){
					rel.pass.forEach(function(varName){
						ns[rel.with].env[varName] = config[varName];
					});
				}
				if(rel.push){
          rel.pass.forEach(function(varName){
            ns[rel.with].env[varName].push(config[varName]);
          });
        }
			}
			if(rel.invoke && rel.func){
				ns[rel.invoke][rel.func](config);
			}				
		});
	}
}
/*
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
	ns.push(el);
}
function formatServerConfig(el){
	formatName(el, ns);
	if(!el.root)
		el.root = disp.initConfig.distPath + el.name + "/";
	el.ns= [];
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
	el.components = [];
	if(!el.root)
		el.root = server.root + el.name + "/";
		
	if (!fs.existsSync(el.root))
		fs.mkdirSync(el.root);
	
}
*/

/*
function readJson(file, defaultJson){
	var json = {};
	if (fs.existsSync(file))
    json = require(file);
	
	extend(json, defaultJson);
	return json;
}
*/
function initFromConfig(){
	
	var defaultInitConfig = {
		name: "cms",
		type: "cms",
		port: 8088
	};
	var initConfig = require("./init");
	extend(initConfig, defaultInitConfig);

	disp.initConfig = initConfig;

	extendConfig(disp.initConfig);
	ns.forEach(function(config){
		extendDeps(config);
	});
	ns.forEach(function(config){
		applyConfig(config);
	});
	console.log(ns);
	console.log(entrances);
}
function checkEnv(fn){
	if(1){
		fn();
	}
}



