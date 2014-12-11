var fs = require("fs");
var utils = require("../../../../utils");
var tmpl = utils.tmpl;
module.exports = function(mod, mp, env, config){
	if(!mp.restful) mp.restful = false;
	if(!mp.apis) mp.apis = [];
	if(!mp.passwordField) mp.passwordField = false;
	if(!mp.usernameField) mp.usernameField = false;
	if(!mp.tokenField) mp.tokenField = false;
	if(!mp.idField) mp.idField = false;
	if(mp.idField){
		if(typeof mp.idField == "string" && mp.idField != mp.fields[0].name){
			console.log("idField must be the first field");
			process.exit(1);
		}
		mp.idField = mp.fields[0].name;
		mp.fields[0].required = true;
		mp.fields[0].unique = true;
	}

	env.schemas[mp.name] = mp;
	return 1;
}

