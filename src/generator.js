var fs = require("fs");
var mkdirp = require("mkdirp");
var dirname = require("path").dirname;
var modPath = __dirname + "/";
function generateSrc(config, fn){
	console.log("generating "+ config.type);
	var src = {};
	if(config.files.length>0){
		src.files = config.files;
		if(!config.srcPath)
			src.srcPath = modPath + config.type + "/";
		else
			src.srcPath = modPath + config.type + "/" + config.srcPath;
		if(!config.destPath)
			src.destPath =  disp.distPath + config.name +"/";
		else
			src.destPath =  disp.distPath + config.destPath + "/";
		if(!config.env)
			src.env={};
		else
			src.env = config.env;
		copyFormated(src);
	}
	if(fn) fn();
}

function copyFormated(json){
	json.files.forEach(function(file){
		var srcFile = json.srcPath + file;
		var destFile = json.destPath + file;
		if(!fs.existsSync(srcFile)){
			console.error("Source file not exists: " + srcFile);
			process.exit(1);
		}
		mkdirp.sync(dirname(destFile));
		console.log(destFile);
		fs.writeFile(destFile, tmpl(srcFile, json.env));
	});
}
var cache = {};
function tmpl(str, data){
	// Simple JavaScript Templating
	// John Resig - http://ejohn.org/ - MIT Licensed
  var fn = fs.existsSync(str) ?
				cache[str] = cache[str] ||
        tmpl(fs.readFileSync(str).toString()) :
				
				// Generate a reusable function that will serve as a template
				// generator (and which will be cached).
				new Function(
					"obj", 
					"var p=[],print=function(){p.push.apply(p,arguments);};" +						
						// Introduce the data as local variables using with(){}
						"with(obj){p.push('" +						
						// Convert the template into pure JavaScript
						str
						.replace(/\\n/g, "\\\\n")
						.replace(/[\n]/g, "\\n")
//						.replace(/[\r\t\n]/g, " ")
						.replace(/\\'/g, "\\\\'")
						.replace(/'/g, "\\'")
						.replace(/((^\$\$)[(^\^\^)]*)'/g, "$1'")
						.replace(/\^\^=(.*?)\$\$/g, "',$1,'")
						.split("\^\^").join("');")
						.split("\$\$").join(";p.push('")
						.replace(/\\^/g, "^")
						.replace(/\\$/g, "$")

						.replace(/(\\[^\\\'n])/g, "\\$1")
//						.split("\r").join("'")
						+ "');}return p.join('');"
				);
  
  // Provide some basic currying to the user
  return data ? fn( data ) : fn;
};
module.exports.generateSrc = generateSrc;
