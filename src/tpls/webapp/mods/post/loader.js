var fs = require("fs");
var utils = require("../../../../utils");
var tmpl = utils.tmpl;
var tplMatch = utils.tplMatch;
module.exports = function(mod, mp, env, config){
	if(mp.fieldSchema){
		mp.fields = [];
		env.schemas[mp.fieldSchema].fields.forEach(function(f){
			if(f.post)
				mp.fields.push(f);
		});
	}
	return 1;
}

