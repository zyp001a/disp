var fs = require("fs");
var utils = require("../../../../utils");
var tmpl = utils.tmpl;
module.exports = function(mod, mp, env, config){
	if(!mp.layout) mp.layout = [{
		text: "Hello World!"
	}];
	return 1;
}

