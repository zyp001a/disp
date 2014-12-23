var fs = require("fs");
var utils = require("../../../../utils");
var tmpl = utils.tmpl;
var tplMatch = utils.tplMatch;
module.exports = function(mod, mp, env, config){
	if(!mp.fields) mp.fields = [];
	if(mp.fieldSchema){
		env.schemas[mp.fieldSchema].fields.forEach(function(f){
			if(f.post)
				mp.fields.push(f);
		});
	}
	if(!mp.method) mp.method = "post";
	if(!mp.withId) mp.withId = false;
	if(!mp.defaultParams) mp.defaultParams = false;
	return 1;
}

