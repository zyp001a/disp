var fs = require("fs");
var utils = require("../../utils");
var tmpl = utils.tmpl;
function _init(root, env){
	if(!env.jsDeps) env.jsDeps = [];
	if(!env.cssDeps) env.cssDeps = [];
	if(!env.angularDeps) env.angularDeps = [];
	if(!env.nodeDeps) env.nodeDeps = {};
	if(!env.runs) env.runs=[];
	if(!env.filters) env.filters = [];
	if(!env.partials) env.partials = [];
	if(!env.services) env.services = [];
	if(!env.directives) env.directives = [];
	if(!env.controllers) env.controllers = [];
	if(!env.nodeControllers) env.nodeControllers = [];
	if(!env.routes) env.routes = [];
	if(!env.nodeRoutes) env.nodeRoutes = [];
}
function _default(mod, mp, env, config){
	console.log("load mod " + mod);
	if(fs.existsSync(mod+"/loader.js"))
		require(mod+"/loader")(mod, mp, env, config);

	var depPath = mod + "/../../deps";
	if(config.mountEnv)
		env[config.mountEnv]=mp;
	
	if(config.jsDeps)
		config.jsDeps.forEach(function(dep){
			if(env.jsDeps.indexOf(dep) == -1)
				env.jsDeps.push({
					name: dep,
					path: depPath + "/js/" + dep
				});
		});
	if(config.cssDeps)
		config.cssDeps.forEach(function(dep){
			if(env.cssDeps.indexOf(dep) == -1)
				env.cssDeps.push({
					name: dep,
					path: depPath + "/css/" + dep
				});
		});
	if(config.angularDeps)
		config.angularDeps.forEach(function(dep){
			if(env.angularDeps.indexOf(dep) == -1)
				env.angularDeps.push(dep);
		});
	if(config.nodeDeps)
		for (var dep in config.nodeDeps){
			env.nodeDeps[dep] = config.nodeDeps[dep];
		};



	if(fs.existsSync(mod+"/run.js")){
		env.runs.push({
			name: mp.name + "Run", 
			content:tmpl(fs.readFileSync(mod+"/run.js").toString(), mp)
		});
	}
	if(fs.existsSync(mod+"/filter.js")){
		env.filters.push({
			name: mp.name + "Filter", 
			content:tmpl(fs.readFileSync(mod+"/filter.js").toString(), mp)
		});
	}
	if(fs.existsSync(mod+"/controller.js")){
		env.controllers.push({
			name: mp.name + "Controller", 
			content:tmpl(fs.readFileSync(mod+"/controller.js").toString(), mp)
		});
	}
	if(fs.existsSync(mod+"/service.js")){
		env.services.push({
			name: mp.name + "Service", 
			content:tmpl(fs.readFileSync(mod+"/service.js").toString(), mp)
		});
	}
	if(fs.existsSync(mod+"/directive.js")){
		env.directives.push({
			name: mp.name + "Directive", 
			content:tmpl(fs.readFileSync(mod+"/directive.js").toString(), mp)
		});
	}
	if(fs.existsSync(mod+"/partial.html")){
		env.partials.push({
			name: mp.name,
			content:tmpl(fs.readFileSync(mod+"/partial.html").toString(), mp)
		});
	}
	if(!config.noRoute && mp.name){
		if(mp.isHome)
			env.routes.push({
				name: mp.name,
				controller: mp.name + "Controller",
				isHome: true,
				access: mp.access || config.access || 3
			});
		else 
			env.routes.push({
				name: mp.name,
				controller: mp.name + "Controller",
				access: mp.access || config.access || 2
			});
	}

	if(fs.existsSync(mod+"/nodeController.js")){
		env.nodeControllers.push({
			name: mp.name, 
			content:tmpl(fs.readFileSync(mod+"/nodeController.js").toString(), mp)
		});
	}
	if(fs.existsSync(mod+"/nodeRoute.js")){
		env.nodeRoutes.push({
			name: mp.name, 
			content:tmpl(fs.readFileSync(mod+"/nodeRoute.js").toString(), mp)
		});
	}


	return 1;
}
module.exports._default = _default;
module.exports._init = _init;
