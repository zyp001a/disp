var fs = require("fs");
var utils = require("../../../../utils");
var tmpl = utils.tmpl;
var tplMatch = utils.tplMatch;
module.exports = function(mod, mp, env, config){
	if(!mp.schema.idField || !mp.schema.codeField
		|| !mp.schema.timeField){
		console.error("schema has no idField or codeField");
		process.exit(1);
	}
	if(!tplMatch(mp.schema.tpl, "mongo")){
		console.error("only mongo is supported");
		process.exit(1);
	}
	return 1;
}

