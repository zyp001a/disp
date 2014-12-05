var fs = require("fs");
var utils = require("../../utils");
var tmpl = utils.tmpl;
var ucfirst = utils.ucfirst;
function _init(root, env){
	if(!env.jsDeps) env.jsDeps = [];
	if(!env.cssDeps) env.cssDeps = [];
	if(!env.angularDeps) env.angularDeps = [];
	if(!env.nodeDeps) env.nodeDeps = {};
	if(!env.runs) env.runs=[];

	if(!env.filters) env.filters = [];
	if(!env.partials) env.partials = [];
	if(!env.services) env.services = [];
	if(!env.csses) env.csses = [];
	if(!env.directives) env.directives = [];
	if(!env.controllers) env.controllers = [];
	if(!env.routes) env.routes = [];
	if(!env.angularTests) env.angularTests = [];

	if(!env.nodeControllers) env.nodeControllers = [];
	if(!env.nodeRoutes) env.nodeRoutes = [];
	if(!env.nodeTests) env.nodeTests = [];
	if(!env.nodeScripts) env.nodeScripts = [];
	if(!env.models) env.models = [];

	if(!env.androidDeps) env.androidDeps = [];
	if(!env.androidCodeDeps) env.androidCodeDeps = [];
	if(!env.androidAPIs) env.androidAPIs = [];
	if(!env.androidAPITests) env.androidAPITests = [];
	if(!env.androidControllers) env.androidControllers = [];
	if(!env.androidProviders) env.androidProviders = [];
	if(!env.androidProviderTests) env.androidProviderTests = [];
	if(!env.androidModels) env.androidModels = [];

	if(!env.schemas) env.schemas = {};
	if(!env.auths) env.auths = {};

	if(!env.static) env.static = false;
	if(!env.navbar) env.navbar = false;
	if(!env.mongodb) env.mongodb = false;
	if(!env.mysql) env.mysql = false;
	env.lcname = env.name.toLowerCase();
	env.ucname = env.name.toUpperCase();
	env.ucfirstname = ucfirst(env.name);
}
function _default(mod, mp, env, config){
	console.log("load mod " + mod);
	if(fs.existsSync(mod+"/loader.js")){
		require(mod+"/loader")(mod, mp, env, config);
	}

	var depPath = mod + "/../../deps";
	if(config.mountEnv){
		env[config.mountEnv]=mp;
		mp.extended = true;
	}
	
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
	if(config.androidDeps)
		config.androidDeps.forEach(function(dep){
			if(env.androidDeps.indexOf(dep) == -1)
				env.androidDeps.push({
					name: dep,
					path: depPath + "/android/" + dep
				});
		});
	if(config.androidCodeDeps)
		config.androidCodeDeps.forEach(function(dep){
			if(env.androidCodeDeps.indexOf(dep) == -1)
				env.androidCodeDeps.push({
					name: dep,
					content:tmpl(fs.readFileSync(depPath + "/java/" + dep).toString(), env)
				});
		});

	if(config.mountSchema){
		if(!env.schemas[mp[config.mountSchema]]){
			console.error("mountSchema failed: Schema "+mp[config.mountSchema]+" not exist");
			process.exit(1);
		}	
		mp.schema = env.schemas[mp[config.mountSchema]];
		mp.schema.extended = true;
	}

//common js
	if(fs.existsSync(mod+"/run.js")){
		env.runs.push({
			name: mp.name + "Run", 
			content:tmpl(fs.readFileSync(mod+"/run.js").toString(), mp)
		});
	}

// angular
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
		if(mp.isHome){
			env.routes.push({
				name: mp.name,
				controller: mp.name + "Controller",
				isHome: true,
				access: mp.access || config.access || 3
			});
		}
		else if(mp.param){
			env.routes.push({
				name: mp.name,
				controller: mp.name + "Controller",
				access: mp.access || config.access || 2,
				param: true
			});
		}
		else{
			env.routes.push({
				name: mp.name,
				controller: mp.name + "Controller",
				access: mp.access || config.access || 2
			});
		}
	}


//android api
	if(fs.existsSync(mod+"/androidAPI.java")){
		mp.ns = env.cop + "." + env.lcname;
		env.androidAPIs.push({
			name: mp.name, 
			content:tmpl(fs.readFileSync(mod+"/androidAPI.java").toString(), mp)
		});
	}
	if(fs.existsSync(mod+"/androidAPITest.java")){
		mp.ns = env.cop + "." + env.lcname;
		env.androidAPITests.push({
			name: mp.name, 
			content:tmpl(fs.readFileSync(mod+"/androidAPITest.java").toString(), mp)
		});
	}
	if(fs.existsSync(mod+"/androidController.java")){
		mp.ns = env.cop + "." + env.lcname;
		env.androidControllers.push({
			name: mp.name + "Controller.java", 
			content:tmpl(fs.readFileSync(mod+"/androidController.java").toString(), mp)
		});
	}
	if(fs.existsSync(mod+"/androidProvider.java")){
		mp.ns = env.cop + "." + env.lcname;
		env.androidProviders.push({
			name: mp.name, 
			content:tmpl(fs.readFileSync(mod+"/androidProvider.java").toString(), mp)
		});
	}
	if(fs.existsSync(mod+"/androidProviderTest.java")){
		mp.ns = env.cop + "." + env.lcname;
		env.androidProviderTests.push({
			name: mp.name, 
			content:tmpl(fs.readFileSync(mod+"/androidProviderTest.java").toString(), mp)
		});
	}
	if(fs.existsSync(mod+"/androidModel.java")){
		mp.ns = env.cop + "." + env.lcname;
		env.androidModels.push({
			name: mp.name, 
			content:tmpl(fs.readFileSync(mod+"/androidModel.java").toString(), mp)
		});
	}


//nodejs 
	if(fs.existsSync(mod+"/nodeController.js")){
		env.nodeControllers.push({
			name: mp.name, 
			content:tmpl(fs.readFileSync(mod+"/nodeController.js").toString(), mp)
		});
	}
	if(fs.existsSync(mod+"/nodeScript.js")){
		env.nodeScripts.push({
			name: mp.name, 
			content:tmpl(fs.readFileSync(mod+"/nodeScript.js").toString(), mp)
		});
	}
	if(fs.existsSync(mod+"/nodeTest.js")){
		env.nodeTests.push({
			name: mp.name, 
			content:tmpl(fs.readFileSync(mod+"/nodeTest.js").toString(), mp)
		});
	}
	if(fs.existsSync(mod+"/nodeRoute.js")){
		env.nodeRoutes.push({
			name: mp.name, 
			content:tmpl(fs.readFileSync(mod+"/nodeRoute.js").toString(), mp)
		});
	}


	if(fs.existsSync(mod+"/model.js")){
		env.models.push({
			name: mp.name, 
			content:tmpl(fs.readFileSync(mod+"/model.js").toString(), mp)
		});
	}

//css
	if(fs.existsSync(mod+"/style.css")){
		env.csses.push({
			name: mp.name, 
			content:tmpl(fs.readFileSync(mod+"/style.css").toString(), mp)
		});
	}
	
	return 1;
}
module.exports._default = _default;
module.exports._init = _init;