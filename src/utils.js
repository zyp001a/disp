var fs = require("fs");
function tmpl(str, data){
	data.ucfirst = function(str) {
  //  discuss at: http://phpjs.org/functions/lcfirst/
  // original by: Brett Zamir (http://brett-zamir.me)
		str += '';
		var f = str.charAt(0)
					.toUpperCase();
		return f + str.substr(1);
	};

	with(data){
		var p=[];
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
//		console.log(evalstr);
		eval(evalstr);
//		console.log(p);
		return p.join('');
	}
}
function isArray(obj){
	return Object.prototype.toString.call( obj ) === '[object Array]';
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

module.exports.tmpl = tmpl;
module.exports.isArray = isArray;
module.exports.readJSON = readJSON;
module.exports.readJSONUnsafe = readJSONUnsafe;


