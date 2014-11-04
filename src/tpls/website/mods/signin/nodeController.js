var auth = require('./^^=auth$$');

module.exports.signin = function(req, res){
	auth.auth(req.body.username, req.body.password, function(err, user, message){
		if(err || !user) res.send(401, message);
		else {
			console.log(user);
			res.send(user);
		}
//			if(req.body.rememberme) 
//				req.session.cookie.maxAge = 1000 * 60 * 60 * 24 * 7;
//			console.log(user);
		
	});
}
