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
	env.schemas[mp.name] = mp;
	mp.mongodb = env.mongodb;
	if(mp.fields[0].name != "_id")
		mp.fields.unshift({
			"name": "_id",
			"type": "ObjectId"
		});
	return 1;
}

