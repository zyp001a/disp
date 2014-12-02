var fs = require("fs");
var utils = require("../../../../utils");
var tmpl = utils.tmpl;
module.exports = function(mod, mp, env, config){
	if(!mp.param) mp.param = false;
	if(!mp.single) mp.single = false;
	if(!mp.auth) mp.auth = false;
}

