var auth = require('./^^=auth$$');
var Info = require('../models/^^=info$$');
module.exports.signin = function(req, res){
	auth.auth(req.body.username, req.body.password, function(err, user, message){
		if(err || !user) res.send(401, message);
		else {
			console.log(user);
			Info.findOne({'^^=schema.usernameField$$':user.username},function(err, info){
				user.name = info.^^=schema.nameField$$;
				res.send(user);
			})
		}
//			if(req.body.rememberme) 
//				req.session.cookie.maxAge = 1000 * 60 * 60 * 24 * 7;
//			console.log(user);
		
	});
}
