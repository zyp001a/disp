#!/usr/bin/env node

var fs = require("fs");
var mkdirp = require("mkdirp");
var dirname = require("path").dirname;
//var modPath = __dirname + "/";

var node = process.argv[0];
var dispCmd = process.argv[1];
var dir = process.argv[2];
var dist = process.argv[3];




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
					loader[obj["tpl"].loader](nsPath+"/"+obj["tpl"].name, obj, env);
				}
				else{
					loader._default(nsPath+"/"+obj["tpl"], obj, env);
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
function isArray(obj){
	return Object.prototype.toString.call( obj ) === '[object Array]';
}
function readJSON(file){
	if(fs.existsSync(file))
		return JSON.parse(fs.readFileSync(file));
	else{
		console.error("No JSON file:" + file);
		process.exit(1);
	}
}
	

//iterate ./src dir
var srcRoot, distDir, distRoot;
if(dist)
	distDir = dist;
else
	distDir = dir + "/dist";
mkdirp(distDir);

//read ./project.json
var config, env, loader;

var modPath = dirname(dispCmd) + "/../src/tpls";
//console.log(modPath);
var nsPath;
config = readJSON(dir + "/project.json");	
if(config && config.hasOwnProperty("env")){
		env = config.env;
}

if(config.hasOwnProperty("ns")){
	nsPath = modPath + "/"+config.ns;
	loader = require(nsPath + "/loader");
}

extendObj(config);
console.log(JSON.stringify(config));


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
else{
	srcRoot = dir + "/src";
	distRoot = distDir;
	walk(srcRoot);
}

//var cache = {};

function walk(dir){
	if(!fs.existsSync(dir)){
		return 0;
	}

	fs.readdirSync(dir).forEach(function(f){
		if(f== "." || f.match(/~/)){
			return 0;
		}
		var p = dir + '/' + f;
		var tdir = dir.replace(new RegExp("^"+quote(srcRoot)), distRoot);
		var	stat = fs.statSync(p);
		if(stat.isDirectory()){
			mkdirp.sync(tdir + '/' + f);
			walk(p);
			return 0;
		}
		console.log("file:"+p);
// if begin with disp, format the file
		if(f.match(/^disp\./)){
			if(f == "disp.json"){
				//load empty dir
				var dj = readJSON(p);
				with(env){
					var evalstr = dj.array+".forEach(function(e){"+
               "fs.writeFile(tdir+'/'+e."+dj.file+",e." + dj.data+ ")"+
              "})";
					console.log(evalstr);
					eval(evalstr);
				}
			}
			else{
				var t = tdir + '/' + f.replace(/^disp\./, "");				
				fs.writeFile(t, tmpl(fs.readFileSync(p).toString(), env));
			}
		}
//	else copy file
		else{
			var t = tdir + '/' + f;
			copy(p, t);
		}
	});
};

function quote(str){
	return (str+'').replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
}
function copy(oldFile, newFile){
	newFp = fs.createWriteStream(newFile);     
	oldFp = fs.createReadStream(oldFile);
	oldFp.pipe(newFp);
}

function tmpl(str, data){
	with(data){
		var p=[];
		var evalstr = "p.push('"+
		str
			.replace(/\n/g, "\\n")
			.replace(/\^\^=(.*?)\$\$/g, "',$1,'")
			.replace(/\s*(\^\^.*?\$\$)\s*\\n\s*/g, "$1")
			.split("\^\^").join("');")
			.split("\$\$").join(";p.push('")
			+ "');";
//		console.log(evalstr);
		eval(evalstr);
//		console.log(p);
		return p.join('');
	}
}


