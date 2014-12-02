var fs = require("fs");
var utils = require("../../../../utils");
var tmpl = utils.tmpl;
module.exports = function(mod, mp, env, config){
	if(!mp.auth) mp.auth = false;
	if(!mp.file) mp.file = false;
	return 1;
}

