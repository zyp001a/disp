var fs = require("fs");
var utils = require("../../utils");
var tmpl = utils.tmpl;
function _init(root, env){

}
function _default(mod, mp, env, config){
	console.log("load mod " + mod);
	var depPath = mod + "/../../deps";
	if(config.mountEnv)
		env[config.mountEnv]=mp;
	if(!env.jsDeps)
		env.jsDeps = [];
	if(config.jsDeps)
		config.jsDeps.forEach(function(dep){
			if(env.jsDeps.indexOf(dep) == -1)
				env.jsDeps.push({
					name: dep,
					path: depPath + "/js/" + dep
				});
		});
	if(!env.cssDeps)
		env.cssDeps = [];
	if(config.cssDeps)
		config.cssDeps.forEach(function(dep){
			if(env.cssDeps.indexOf(dep) == -1)
				env.cssDeps.push({
					name: dep,
					path: depPath + "/css/" + dep
				});
		});
	if(!env.angularDeps)
		env.angularDeps = [];
	if(config.angularDeps)
		config.angularDeps.forEach(function(dep){
			if(env.angularDeps.indexOf(dep) == -1)
				env.angularDeps.push(dep);
		});
	if(!env.nodeDeps)
		env.nodeDeps = {};
	if(config.nodeDeps)
		for (var dep in config.nodeDeps){
			env.nodeDeps[dep] = config.nodeDeps[dep];
		};

	if(fs.existsSync(mod+"/partial.html")){
		if(fs.existsSync(mod+"/controller.js")){
			if(!env.controllers)
				env.controllers = [];
			env.controllers.push({
				name: mp.name + "Controller", 
				content:tmpl(fs.readFileSync(mod+"/controller.js").toString(), mp)
			});
		}
		if(!env.partials)
			env.partials = [];
		env.partials.push({
			name: mp.name,
			content:tmpl(fs.readFileSync(mod+"/partial.html").toString(), mp)
		});
		if(!env.routes)
			env.routes = [];
		if(mp.isHome)
			env.routes.push({
				name: mp.name,
				controller: mp.name + "Controller",
				isHome: true
			});			
		else if(!mp.noRoutes)
			env.routes.push({
				name: mp.name,
				controller: mp.name + "Controller"
			});
	}
	if(fs.existsSync(mod+"/nodeController.js")){
/*
		if(fs.existsSync(mod+"/model.js")){
			if(!env.models)
				env.models = [];
			env.models.push({
				name: mp.name, 
				content:tmpl(fs.readFileSync(mod+"/model.js").toString(), mp)
			});
		}
*/
		if(!env.nodeControllers)
			env.nodeControllers = [];
		env.nodeControllers.push({
			name: mp.name, 
			content:tmpl(fs.readFileSync(mod+"/nodeController.js").toString(), mp)
		});
	}


	if(fs.existsSync(mod+"/loader.js"))
		 require(mod+"/loader")(mod, mp, env, config);
	return 1;
}
module.exports._default = _default;
module.exports._init = _init;
