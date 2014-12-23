var fs = require("fs");
var utils = require("../../../../utils");
var tmpl = utils.tmpl;
module.exports = function(mod, mp, env, config){
	if(!mp.strategy) mp.strategy == "bearer";
	if(mp.strategy == "basic"){
		env.nodeDeps["passport-http"]="*";
	}else if(mp.strategy == "local"){
		env.nodeDeps["passport-local"]="*";
	}else if(mp.strategy == "bearer"){
		env.nodeDeps["passport-http-bearer"]="*";
	}
	if(!mp.signin) mp.signin = "signin";
	if(!mp.signup) mp.signup = "signup";
	if(!mp.newpass) mp.newpass = "newpass";
	if(!mp.signinAfterSignup) mp.signinAfterSignup = false;

	if(!mp.code) mp.code = false;
	env.auths[mp.name] = mp;
	return 1;
}

