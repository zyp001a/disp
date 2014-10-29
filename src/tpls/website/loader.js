var fs = require("fs");
var utils = require("../../utils");
function _init(env){

}
function _default(mod, mp, env, config){
	console.log("load mod " + mod);
	var depPath = mod + "/../../deps";
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
		env.nodeDeps = [];
	if(config.nodeDeps)
		config.nodeDeps.forEach(function(dep){
			if(env.nodeDeps.indexOf(dep) == -1)
				env.nodeDeps.push(dep);
		});

	if(fs.existsSync(mod+"/partial.html") && 
		 fs.existsSync(mod+"/controller.js")){
		if(!env.controllers)
			env.controllers = [];
		env.controllers.push({
			name: mp.name + "Controller", 
			content:fs.readFileSync(mod+"/controller.js").toString()
		});
		if(!env.partials)
			env.partials = [];
		env.partials.push({
			name: mp.name,
			content:fs.readFileSync(mod+"/partial.html").toString()
		});
		if(!env.routes)
			env.routes = [];
		env.routes.push({
			name: mp.name,
			controller: mp.name + "Controller"
		});
	}


	if(fs.existsSync(mod+"/loader.js"))
		 require(mod+"/loader")(mod, mp, env, config);
	return 1;
}
module.exports._default = _default;
module.exports._init = _init;
