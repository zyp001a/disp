var fs = require("fs");
var utils = require("../../../../utils");
var tmpl = utils.tmpl;
var tplMatch = utils.tplMatch;
module.exports = function(mod, mp, env, config){
	if(!mp.schema.idField || !mp.schema.codeField){
		console.error("schema has no idField or codeField");
		process.exit(1);
	}

	if(!mp.port) mp.port = 25;
	if(!mp.serverURI) mp.serverURI = env.serverURI;
	if(!mp.test) mp.test = {};
	if(!mp.test.serverURI) mp.test.serverURI = env.test.serverURI;
	return 1;
}

