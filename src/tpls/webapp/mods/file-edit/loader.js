var fs = require("fs");
var utils = require("../../../../utils");
var tmpl = utils.tmpl;
module.exports = function(mod, mp, env, config){
	if(!mp.auth) mp.auth = false;
	return 1;
}

