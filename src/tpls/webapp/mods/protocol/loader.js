var fs = require("fs");
var utils = require("../../../../utils");
var tmpl = utils.tmpl;
module.exports = function(mod, mp, env, config){
	if(!mp.restful) mp.restful = false;
	if(!mp.apis) mp.apis = [];
	if(!mp.usernameField) mp.usernameField = false;
	if(!mp.path) mp.path = false;

	if(mp.path){
		env.upload = true;
		env.nodeDeps["connect-multiparty"]="*";
		if(!mp.uploadApis) mp.uploadApis = [];
		mp.fields.forEach(function(f){
			if(f.type == "Path"){
				mp.uploadApis.push({
					"name": f.name
				});
			}
		});
	}

	return 1;

}

