// Load required packages
var passport = require('passport');
var User = require('../models/^^=db$$');


^^if(strategy == 'basic'){$$
var BasicStrategy = require('passport-http').BasicStrategy;
//TODO
^^}else if(strategy == 'local'){$$
//TODO
/*
var LocalStrategy = require('passport-local').Strategy;
function authenticate(username, password, done) {
  User.findOne({ '^^=schema.usernameField$$': username }, function(err, user) {
    if (err) { return done(err); }
    if (!user) {
      return done(null, false, { message: 'Incorrect username.' });
    }

    user.verifyPassword(password, function(err, isMatch){
			if(err) return done(null, false, { message: err });
			else if(isMatch)	return done(null, user);
      else return done(null, false, { message: 'Incorrect password.' });
    });
  });
}

passport.use("^^=name$$", new LocalStrategy({
    usernameField: '^^=schema.usernameField$$',
    passwordField: '^^=schema.passwordField$$'
},authenticate));
exports.auth = authenticate;
exports.authMidware = passport.authenticate('^^=name$$', {
  failureRedirect: '/^^=signin$$',
//  failureFlash: true,
	session : false 
});
*/
^^}else if(strategy == 'bearer'){$$

var BearerStrategy = require('passport-http-bearer').Strategy;
passport.use("^^=name$$", new BearerStrategy(
  function(token, done) {
    User.findOne({ token: token }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      return done(null, user, { scope: 'all' });
    });
  }
));
module.exports.authMidware = passport.authenticate('^^=name$$', { session: false });

^^}$$



function auth(username, password, done){
  User.findOne({ '^^=schema.usernameField$$': username }, function(err, user) {
    if (err) { return done(err); }
    if (!user) {
      return done({ error: 'Incorrect username.', errorCode: 1 });
    }
    user.verifyPassword(password, function(err, isMatch){
			if(err) return done(err);
			else if(isMatch){
				user.getToken(function(err, token){
					if(err) return done(err);
					else{
						return done(null, {
							username: user.^^=schema.usernameField$$,
							token: token
						});
					}
				});
			}
      else return done({ error: 'Incorrect password.', errorCode: 2 });
    });
  });
}

function signin(req, res){
	auth(req.body.username, req.body.password, function(err, user, message){
		if(err) res.send({error:err});
		else if(!user) res.send({error:"no user"});
		else {
			res.send(user);
/*
			Info.findOne({'^^=schema.usernameField$$':user.username},function(err, info){
				user.name = info.^^=schema.nameField$$;
				res.send(user);
			})
*/
		}
	});
}

^^if(codeDb){$$
var codeDb = require("../models/^^=codeDb$$");
^^}$$

function signup(req, res){
	console.log(req.body);
	if(!req.body.username || !req.body.password){
		res.send({error: "no username or password", data: req.body});
		return;
	}

^^if(codeDb){$$
	if(!req.body.code){
		res.send({error: "no validation code"});
		return;
	}
	var json = {
    "^^=schema1.idField$$": req.body.username,
    "^^=schema1.codeField$$": req.body.code,
    "^^=schema1.timeField$$": {
      $gt: new Date().getTime() - 60*60000
    }
  };
						 console.log(json);
	codeDb.findOne(json, function(err, doc){
		if(err){
			res.send({error: err});
			return;
		}
		if(!doc){
			res.send({error: "validation code error"});
			return;
		}


^^}$$

		var json = {};
		var user = json.^^=schema.usernameField$$ = req.body.username;
		var pass = json.^^=schema.passwordField$$ = req.body.password;
	  var model = new User(json);
		model.save(function(err) {
    	if (err)
				res.send(err);
			else{
				auth(user, pass, function(err, user, message){
					res.send(user);
				});
			}
		});
^^if(codeDb){$$
	});//codeDb.findOne
^^}$$
}

module.exports.auth = auth;
module.exports.signup = signup;
module.exports.signin = signin;

