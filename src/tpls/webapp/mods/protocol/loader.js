var fs = require("fs");
var utils = require("../../../../utils");
var tmpl = utils.tmpl;
module.exports = function(mod, mp, env, config){
	if(!mp.restful) mp.restful = false;
	if(!mp.apis) mp.apis = [];
	if(!mp.usernameField) mp.usernameField = false;
	return 1;
}

