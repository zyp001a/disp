#!/usr/bin/env node

var fs = require("fs");
var mkdirp = require("mkdirp");
var dirname = require("path").dirname;
var utils = require("./utils");
//var modPath = __dirname + "/";
var tmpl = utils.tmpl;
var readJSON = utils.readJSON;
var readJSONUnsafe = utils.readJSONUnsafe;
var isArray = utils.isArray;

var node = process.argv[0];
var dispCmd = process.argv[1];
var dir = process.argv[2];
var dist = process.argv[3];

if(!dir){
	dir=".";
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
			if(obj.hasOwnProperty("tpl")){
				if(typeof obj["tpl"] === "object"){
					loadMod(obj["tpl"].loader, obj["tpl"].name, obj);
				}
				else{
					loadMod("_default", obj["tpl"], obj);
				}
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
function loadMod(loaderType, name, mp){
	var config = readJSONUnsafe(nsPath+"/mods/"+name + "/config.json");
	loader[loaderType](nsPath+"/mods/"+name, mp, env, config);
}
	


var srcRoot, distDir, distRoot;
if(dist)
	distDir = dist;
else
	distDir = dir + "/dist";
mkdirp.sync(distDir);

//read ./project.json
var config, env, loader;

var modPath = dirname(dispCmd) + "/../src/tpls";
//console.log(modPath);
var nsPath;
config = readJSON(dir + "/project.json");	
if(config && config.hasOwnProperty("env")){
		env = config.env;
}
else{
	console.error("no env");
	process.exit(1);
}

if(config.hasOwnProperty("ns")){
	nsPath = modPath + "/"+config.ns;
	loader = require(nsPath + "/loader");
	if(loader._init)
		loader._init(dir, env);
}

extendObj(config);
console.log(JSON.stringify(config));

//iterate proto
if(config.hasOwnProperty("proto") && config.hasOwnProperty("ns")){
	if(isArray(config.proto)){
		config.proto.forEach(function(proto){
			srcRoot = nsPath + "/" + proto;
			distRoot = distDir + "/" + proto;
			walk(srcRoot);
		});
	}else{
		srcRoot = nsPath + "/" + config.proto;
		distRoot = distDir;
		walk(srcRoot);
	}
}

srcRoot = dir + "/src";
distRoot = distDir;
//iterate ./src dir
walk(srcRoot);


//var cache = {};

function walk(dir){
	if(!fs.existsSync(dir)){
		return 0;
	}

	var files = fs.readdirSync(dir);
	files.forEach(function(f){
		if(f== "." || f.match(/~/)){
			return 0;
		}
		var p = dir + '/' + f;
		var tdir = dir.replace(new RegExp("^"+quote(srcRoot)), distRoot);
		var	stat = fs.statSync(p);
		if(stat.isDirectory()){
			walk(p);
			return 0;
		}
//		console.log("file:"+p);
// if begin with disp, format the file
		if(f.match(/^disp\./)){
			if(f == "disp.json"){
				//load empty dir
				var dj = readJSON(p);
				if(!dj.file) dj.file = "name";
				if(!dj.data) dj.data = "content";
				if(!dj.path) dj.path = "path";
				with(env){
					var evalstr = dj.array+".forEach(function(e){"+
								"var df = tdir + '/' + e."+dj.file + ";" + 
								"if(e." + dj.data + "){" +
									"mkdirp.sync(dirname(df));"+
									"fs.writeFile(df, e." + dj.data+ ");"+
								"}else if(e." + dj.path + "){"+
									"mkdirp.sync(dirname(df));"+
									"copySync(e." + dj.path+ ",df);"+
								"}"+
							 "})";
//					console.log(evalstr);
					eval(evalstr);
				}
			}
			else{
				var t = tdir + '/' + f.replace(/^disp\./, "");				
				mkdirp.sync(dirname(t));
				fs.writeFileSync(t, tmpl(fs.readFileSync(p).toString(), env));
			}
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
  var fdw = fs.openSync(destFile, 'w');
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

