var fs = require("fs");
function ucfirst(str) {
  //  discuss at: http://phpjs.org/functions/lcfirst/
  // original by: Brett Zamir (http://brett-zamir.me)
	str += '';
	var f = str.charAt(0)
				.toUpperCase();
	return f + str.substr(1);
};

function tmpl(str, data){
	data.ucfirst = ucfirst;
	var p=[];
	var win, wout;
	var evalstr = "p.push('";
	with(data){
		str = str.replace(/\r/g,"");
		str = str.
			replace(/[^\S\n]*(\^\^[^=]((?!\$\$).)*\$\$)\s*\n/g, "$1");
		//[\s but not \n]* [^^] [not =] [not $$]* [$$] [\s*\n] 
//		console.log(str);
		str.split("\^\^").forEach(function(sub, i){
			if(i==0){
				win = "";
				wout = sub || "";
			}else{
				var subs = sub.split("\$\$");
				win = subs[0];
				wout = subs[1] || "";
			}
			wout = wout.replace(/\\([nrt'])/g, "\\\\$1")
				.replace(/\n/g, "\\n")
				.replace(/'/g, "\\'")
				.replace(/\\\"/g, "\\\\\\\"");

			if(win && win[0] == '='){
				evalstr += (win.replace(/^=(.+)/, "',$1,'") + wout);
			}
			else{

				evalstr+=("');"+win+";p.push('"+wout);
			}
			
		});
		evalstr+="');";
//		evalstr = evalstr.replace("p.push('')");

/*
		var evalstr = "p.push('"+
		str
			.replace(/\\([nrt'])/g, "\\\\$1")
			.replace(/\n/g, "\\n")
			.replace(/'/g, "\\'")
			.replace(/\^\^=(.*?)\$\$/g, "',$1,'")
			.replace(/\s*(\^\^.*?\$\$)\s*\\n/g, "$1")
			.split("\^\^").join("');")
			.split("\$\$").join(";p.push('")
			+ "');";
*/
//		console.log(evalstr);
		eval(evalstr);
//		console.log(p);
		return p.join('');
	}
}
function isArray(obj){
	return Object.prototype.toString.call( obj ) === '[object Array]';
}
function tplMatch(obj, str){
	var match = false;
	if(isArray(obj))
		obj.forEach(function(o){
			if(o==str)
				match = true;
		});
	else
		match = (obj == str);
	return match;
}
function readJSON(file){
	if(fs.existsSync(file)){
		return JSON.parse(fs.readFileSync(file));
	}
	else{
		console.error("No JSON file:" + file);
		process.exit(1);
	}
}
function readJSONUnsafe(file){
	if(fs.existsSync(file)){
		return JSON.parse(fs.readFileSync(file));
	}
	else{
		return {};
	}
}

function readDir(path){
}
module.exports.tmpl = tmpl;
module.exports.isArray = isArray;
module.exports.readJSON = readJSON;
module.exports.readJSONUnsafe = readJSONUnsafe;
module.exports.readDir = readDir;
module.exports.ucfirst = ucfirst;
module.exports.tplMatch = tplMatch;



