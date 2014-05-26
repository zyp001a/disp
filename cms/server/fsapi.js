var fs = require('fs'),
    path = require('path');
function getFile(filename){
	var stats = fs.lstatSync(filename);
	if (stats.isDirectory()) {
		return filename;
	}
	else{
		var content = fs.readFileSync(filename);
		return content;
	}
}
function listDir(filename) {
	return fs.readdirSync(filename).map(function(child){
		var childname = filename + '/' + child;
		var stats = fs.lstatSync(childname),
      info = {
        fullPath: childname,
        title: path.basename(childname)
      };
		if (stats.isDirectory()) {
			info.folder = true;
			info.lazy = true;
		}
		return info;
	});
}

module.exports.listDir = listDir;
module.exports.getFile = getFile;
if (module.parent == undefined) {
    // node dirTree.js ~/foo/bar
    var util = require('util');
    console.log(util.inspect(listDir(process.argv[2], process.argv[3]), false, null));
}
