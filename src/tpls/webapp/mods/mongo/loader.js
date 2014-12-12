var fs = require("fs");
var utils = require("../../../../utils");
var tmpl = utils.tmpl;
var ucfirst = utils.ucfirst;
module.exports = function(mod, mp, env, config){
	if(!mp.restful) mp.restful = false;
	if(!mp.apis) mp.apis = [];
	if(!mp.passwordField) mp.passwordField = false;
	if(!mp.usernameField) mp.usernameField = false;
	if(!mp.tokenField) mp.tokenField = false;
	if(!mp.idField) mp.idField = false;
	mp.mongo = env.mongo;
	mp.dbdef = env.dbdef;
	if(!mp.idField && mp.fields[0].name != "_id"){
		mp.idField = "_id";
		mp.fields.unshift({
			"name": "_id",
			"type": "ObjectId"
		});
	}
	if(mp.idField){
		if(typeof mp.idField == "string" && mp.idField != mp.fields[0].name){
			console.log("idField must be the first field");
			process.exit(1);
		}
		mp.idField = mp.fields[0].name;
		if(mp.idField != "_id"){
			mp.fields[0].required = true;
			mp.fields[0].unique = true;
		}
	}


	if(!mp.path) mp.path = false;
	if(mp.path){
		env.nodeDeps["connect-multiparty"]="*";
		if(!mp.uploadApis){
			mp.uploadApis = [];
			mp.fields.forEach(function(f){
				if(f.type == "Path"){
					mp.uploadApis.push({
						"name": mp.name + ucfirst(f.name),
						"path": mp.name + "/" + f.name,
						"media": f.media || "image"
					});
				}
			});
		}
	}

	env.schemas[mp.name] = mp;
	return 1;
}

