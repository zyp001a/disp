#!/usr/bin/env node

var fs = require("fs");
var mkdirp = require("mkdirp");
var path = require("path");
var dirname = path.dirname;
var utils = require("./utils");
var tmpl = utils.tmpl;
var readJSON = utils.readJSON;
var readJSONUnsafe = utils.readJSONUnsafe;
var isArray = utils.isArray;
var isExec = utils.isExec;
var readDir = utils.readDir;
var ucfirst = utils.ucfirst;

var node = process.argv[0];
var dispCmd = process.argv[1];
var dir = process.argv[2];
var dist = process.argv[3];

if(!dir){
	dir=".";
}
function readNsDir(nsPath){
	return {};
}

function extendObj(obj){
	if(typeof obj === "object"){
		if(isArray(obj)){
			obj.forEach(function(e, i){
				if(extendObj(e)){
					obj[i]= readJSON(dir+"/"+e.mount);
					return 0;
				}
			});
		}
		else{
			if(obj.hasOwnProperty("mount")){
				return 1;
			}
			for (var prop in obj){
				if(extendObj(obj[prop])){
					obj[prop]= JSON.parse(fs.readFileSync(dir+"/"+obj[prop].mount));
				}
			}
		}
	}
	else{
		return 0;
	}
}
function tplObj(obj){
	if(typeof obj === "object"){
		if(isArray(obj)){
			obj.forEach(function(e, i){
				tplObj(e);
			});
		}
		else{
			if(obj.hasOwnProperty('extended')){
				return 0;
			}
			if(obj.hasOwnProperty("tpl")){
				if(isArray(obj["tpl"]))
					obj["tpl"].forEach(function(tpl){
						loadMod(tpl, obj);
					});
				else
					loadMod(obj["tpl"], obj);
			}
			for (var prop in obj){
				tplObj(obj[prop]);
			}
		}
	}
	else{
		return 0;
	}
}
function getPath(name, paths){
	var modPath;
	paths.forEach(function(path){
		if(fs.existsSync(path + "/" +name))
			modPath = path + "/" +name;
	});
	return modPath;
}
function loadMod(modName, mp){
	console.log("loadMod: " + mp.name);
	var loaderType, name;
	//TODO example for loaderType 
	if(mp.loader){
		loaderType = mp.loader;
	}
	else{
		loaderType = "_default";
	}
	var modPath = getPath(mp.tpl, modPaths);;
	if(!modPath){
		console.error("no modPath "+ mp.name);
		console.error(modPaths);
		process.exit(1);
	}
		
	var config = readJSONUnsafe(modPath + "/config.json");
	if(config.deps){
//TODO
	}

	loader[loaderType](modPath, mp, env, config);
	mp.extended = true;
}



var srcRoot, distDir, distRoot;

//read ./project.json
var config, env, loader;

var tplPath = dirname(dispCmd) + "/../src/tpls";
var nsPath;
config = readJSON(dir + "/project.json");	
if(config && config.hasOwnProperty("env")){
		env = config.env;

// assign common function
//	env.ucfirst = ucfirst;
}
else{
	console.error("no env");
	process.exit(1);
}

if(dist)
	distDir = dist;
else
	distDir = dir + "/dist";
mkdirp.sync(distDir);


var modPaths = [path.resolve("./mods")];
if(env.modPaths)
	env.modPaths.forEach(function(m){
		modPaths.push(path.resolve(m));
	});


if(config.hasOwnProperty("ns")){
	nsPath = tplPath + "/"+config.ns;
	modPaths.push(nsPath+"/mods");
	env.ns = readNsDir(nsPath);
	env.ns.extended = true;
	loader = require(nsPath + "/loader");
	if(loader._init)
		loader._init(dir, env);
}


extendObj(config);
tplObj(config);


//iterate proto
if(config.hasOwnProperty("proto") && config.hasOwnProperty("ns")){
	if(isArray(config.proto)){
		config.proto.forEach(function(proto){
			srcRoot = nsPath + "/protos/" + proto;
			distRoot = distDir + "/" + proto;
			walk(srcRoot);
		});
	}else{
		srcRoot = nsPath + "/protos/" + config.proto;
		distRoot = distDir;
		walk(srcRoot);
	}
}

srcRoot = dir + "/src";
distRoot = distDir;
//iterate ./src dir
walk(srcRoot);


//var cache = {};

function walk(dir, tdir){
	if(!fs.existsSync(dir)){
		return 0;
	}

// first look at  disp.json

	if(!tdir)
		tdir = dir.replace(new RegExp("^"+quote(srcRoot)), distRoot);

	var dj = {};
	if(fs.existsSync(dir+"/disp.json")){
		dj = readJSON(dir+"/disp.json");
		if(dj.mv){
			tdir = dirname(tdir) + "/" + tmpl(dj.mv, env);
		}
		if(dj.ignore){
			if(fs.existsSync(tdir))
				return;
		}
		if(!dj.file) dj.file = "^^=name$$";
		if(!dj.data) dj.data = "content";
		if(!dj.path) dj.path = "path";
		if(dj.array && env[dj.array])
			with(env){
				var evalstr = dj.array+".forEach(function(e){"+
							"var df = tdir + '/' + tmpl('"+dj.file + "',e);" + 
							"if(e." + dj.data + "){" +
							"mkdirp.sync(dirname(df));"+
							"fs.writeFile(df, e." + dj.data+ ");"+
							"}else if(e." + dj.path + "){"+
							"mkdirp.sync(dirname(df));"+
							"copySync(e." + dj.path+ ",df);"+
							"}"+
							"})";
//						console.log(evalstr);
				eval(evalstr);
			}
	}

// then iterate file
	var files = fs.readdirSync(dir);
	files.forEach(function(f){
		if(f== "." || f.match(/~/) || f == "disp.json"){
			return 0;
		}
		var p = dir + '/' + f;
// support disp. in directory name

		var	stat = fs.statSync(p);
		if(stat.isDirectory()){
			walk(p, tdir + "/" + f);
			return 0;
		}
//		console.log("file:"+p);
// if begin with disp, format the file
		if(f.match(/^disp\./)){
			console.log("file: " + f);
			var t = tdir + '/' + f.replace(/^disp./, "");				
			mkdirp.sync(dirname(t));
			fs.writeFileSync(t, tmpl(fs.readFileSync(p).toString(), env));
		}
//	else copy file
		else{
			var t = tdir + '/' + f;
			mkdirp.sync(dirname(t));
			copySync(p, t);
		}
	});
};

function quote(str){
	return (str+'').replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
}
function copy(srcFile, destFile){
	var newFp = fs.createWriteStream(destFile);     
	var oldFp = fs.createReadStream(srcFile);
	oldFp.pipe(newFp);
}
function copySync(srcFile, destFile){
	var BUF_LENGTH = 64*1024;
  var buff = new Buffer(BUF_LENGTH);
  var fdr = fs.openSync(srcFile, 'r');
  var fdw;
	if(isExec(srcFile))
		fdw = fs.openSync(destFile, 'w', "775");
	else	
		fdw = fs.openSync(destFile, 'w');

  var bytesRead = 1;
  var pos = 0;
  while(bytesRead > 0){
    bytesRead = fs.readSync(fdr, buff, 0, BUF_LENGTH, pos);
    fs.writeSync(fdw,buff,0,bytesRead);
    pos += bytesRead;
	}
  fs.closeSync(fdr);
  fs.closeSync(fdw);
}

