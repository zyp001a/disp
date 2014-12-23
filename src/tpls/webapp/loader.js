var fs = require("fs");
var utils = require("../../utils");
var dbdef = require("./dbdef");
var tmpl = utils.tmpl;
var ucfirst = utils.ucfirst;
var extend1 = utils.extend1;
var isArray = utils.isArray;
function _init(root, env){
	if(!env.isolatedHtmls) env.isolatedHtmls = [];

	if(!env.cssDeps) env.cssDeps = [];
	if(!env.csses) env.csses = [];

	if(!env.angularDeps) env.angularDeps = [];
	if(!env.jsDeps) env.jsDeps = [];
	if(!env.runs) env.runs=[];
	if(!env.filters) env.filters = [];
	if(!env.partials) env.partials = [];
	if(!env.services) env.services = [];
	if(!env.directives) env.directives = [];
	if(!env.controllers) env.controllers = [];
	if(!env.routes) env.routes = [];
	if(!env.angularTests) env.angularTests = [];

	if(!env.nodeDeps) env.nodeDeps = {};
	if(!env.nodeDevDeps) env.nodeDevDeps = {};
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
	if(!env.mongo) env.mongo = false;
	if(!env.mysql) env.mysql = false;
	env.lcname = env.name.toLowerCase();
	env.ucname = env.name.toUpperCase();
	env.ucfirstname = ucfirst(env.name);

	if(!env.port) env.port = 3000;

	if(!env.test)
		env.test = {};
	if(env.mongo && !env.test.mongo){
		env.test.mongo = extend1(env.mongo);
		env.test.mongo.path+="_test";
	}
	if(env.mysql && !env.test.mysql){
		env.test.mysql = extend1(env.mysql);
		env.test.mysql.db+="_test";
	}
	if(!env.test.port){
		env.test.port = env.port + 10;
		
	}
	env.serverURI = env.host+":"+env.port;
	env.test.serverURI = env.host+":"+env.test.port;
	env.dbdef = dbdef;
}
function _default(mod, mp, env, config){
	console.log("load mod " + mod);
	var depPath = mod + "/../../deps";

	// mount options
	if(config.mountEnv){
		env[config.mountEnv]=mp;
		mp.extended = true;
	}
	if(config.mountSchema){
		if(!isArray(config.mountSchema))
			config.mountSchema = [config.mountSchema];
		config.mountSchema.forEach(function(sc, i){
			if(mp[sc]){
				if(!env.schemas[mp[sc]]){
					console.error("mountSchema failed: Schema "+mp[sc]+" not exist");
				process.exit(1);
				}
				if(i==0){
					mp.schema = env.schemas[mp[sc]];
					mp.schema.extended = true;
				}
				else{
					mp["schema"+i] = env.schemas[mp[sc]];
					mp["schema"+i].extended = true;
				}
			}
		});
	}

	//exe loader.js
	if(fs.existsSync(mod+"/loader.js")){
		require(mod+"/loader")(mod, mp, env, config);
	}


	//config dependencies

	utils.setEnvArrayDep(config.cssDeps, env.cssDeps, depPath + "/css/");

	//css
	utils.setEnvContent(env.csses, mod+"/style.css", mp);
	utils.setEnvContent(env.isolatedHtmls, mod+"/isolated.html", mp);

	// angular
	if(!mp.notAngular){
		utils.setEnvArrayDep(config.jsDeps, env.jsDeps, depPath + "/js/");

		utils.setEnvContent(env.csses, mod+"/style.css", mp);
		utils.setEnvContent(env.runs, mod+"/run.js", mp);

		if(config.angularDeps)
			config.angularDeps.forEach(function(dep){
				if(env.angularDeps.indexOf(dep) == -1)
					env.angularDeps.push(dep);
			});

		utils.setEnvContent(env.filters, mod+"/filter.js", mp);

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
	}
	if(!mp.notAndroid){
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
				name: mp.name, 
				content:tmpl(fs.readFileSync(mod+"/androidController.java").toString(), mp)
			});
		}
		if(mp.androidProvider){
			if(fs.existsSync(mod+"/androidProvider.java")){
				mp.ns = env.cop + "." + env.lcname;
				env.androidProviders.push({
					name: mp.name, 
					content:tmpl(fs.readFileSync(mod+"/androidProvider.java").toString(), mp)
				});
				if(fs.existsSync(mod+"/androidProviderTest.java")){
					mp.ns = env.cop + "." + env.lcname;
					env.androidProviderTests.push({
						name: mp.name, 
						content:tmpl(fs.readFileSync(mod+"/androidProviderTest.java").toString(), mp)
					});
				}
			}
		}
		if(fs.existsSync(mod+"/androidModel.java")){
			mp.ns = env.cop + "." + env.lcname;
			env.androidModels.push({
				name: mp.name, 
				content:tmpl(fs.readFileSync(mod+"/androidModel.java").toString(), mp)
			});
		}

	}
	//nodejs 
	if(!mp.notNodejs){
		if(config.nodeDeps)
			for (var dep in config.nodeDeps){
				env.nodeDeps[dep] = config.nodeDeps[dep];
			};
		if(config.nodeDevDeps)
			for (var dep in config.nodeDevDeps){
				env.nodeDevDeps[dep] = config.nodeDevDeps[dep];
			};

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
	}
	
	return 1;
}

module.exports._default = _default;
module.exports._init = _init;
