var fs = require('fs'),
    path = require('path');

function dirTree(filename) {
    var stats = fs.lstatSync(filename),
        info = {
          fullPath: filename,
          text: path.basename(filename)
        };

    if (stats.isDirectory()) {
        info.icon = "folder";
			info.type = "folder";
        info.children = fs.readdirSync(filename).map(function(child) {
            return dirTree(filename + '/' + child);
        });
    } else {
        // Assuming it's a file. In real life it could be a symlink or
        // something else!
        info.icon = "file";
			info.type = "file";
    }

    return info;
}
module.exports.dirTree = dirTree;
if (module.parent == undefined) {
    // node dirTree.js ~/foo/bar
    var util = require('util');
    console.log(util.inspect(dirTree(process.argv[2]), false, null));
}
