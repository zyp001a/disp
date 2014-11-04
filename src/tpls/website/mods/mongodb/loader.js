var fs = require("fs");
var utils = require("../../../../utils");
var tmpl = utils.tmpl;
module.exports = function(mod, mp, env, config){
	if(mp.schemas){
		env.models = [];
		mp.schemas.forEach(function(schema){
			env.models.push({
				"name": schema.name,
				"content": tmpl(fs.readFileSync(mod+"/model.js").toString(), schema)
			});
			if(!schema.noController){
				env.nodeControllers.push({
					"name": schema.name,
					"content": tmpl(fs.readFileSync(mod+"/dbController.js").toString(), schema)
				});
			}
			if(!schema.noRoute){
				env.nodeRoutes.push({
					"name": schema.name,
					"type": "get",
					"method": schema.name+"Controller.getList",
					"auth": schema.auth
				});
				env.nodeRoutes.push({
					"name": schema.name,
					"type": "post",
					"method": schema.name+"Controller.postList",
					"auth": schema.auth
				});
				env.nodeRoutes.push({
					"name": schema.name + "/:id",
					"type": "get",
					"method": schema.name+"Controller.get",
					"auth": schema.auth
				});
				env.nodeRoutes.push({
					"name": schema.name + "/:id",
					"type": "put",
					"method": schema.name+"Controller.put",
					"auth": schema.auth
				});
				env.nodeRoutes.push({
					"name": schema.name + "/:id",
					"type": "delete",
					"method": schema.name+"Controller.delete",
					"auth": schema.auth
				});
			}
		});
	}
	return 1;
}

