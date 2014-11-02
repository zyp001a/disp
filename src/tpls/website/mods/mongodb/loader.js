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
				if(!env.nodeControllers)
					env.nodeControllers = [];
				env.nodeControllers.push({
					"name": schema.name,
					"content": tmpl(fs.readFileSync(mod+"/dbController.js").toString(), schema)
				});
			}
		});
	}
	return 1;
}

