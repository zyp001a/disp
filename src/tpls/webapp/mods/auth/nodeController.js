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
      return done(1);
    }
    user.verifyPassword(password, function(err, isMatch){
			if(err) return done(err);
			else if(isMatch){
				user.getToken(function(err, token){
					if(err) return done(err);
					else{
						return done(null, {
							id: user.^^=schema.idField$$,
							username: user.^^=schema.usernameField$$,
							token: token
						});
					}
				});
			}
      else return done(2);
    });
  });
}
function _signin(json, fn){
	auth(json.username, json.password, function(err, user){
		if(err) {
			fn(err);
			return;
		}	
		fn(null, user);
/*
			Info.findOne({'^^=schema.usernameField$$':user.username},function(err, info){
				user.name = info.^^=schema.nameField$$;
				res.send(user);
			})
*/
	});	
}
function signin(req, res){
	_signin({
		username: req.body.username,
		password: req.body.password
	}, function(err, user){
		console.log(err);
		console.log(user);
		if(err) {
			if(err == 1){
				res.send({error:"Username doesn't exist", errorCode:1});
			}else if(err == 2){
				res.send({error:"Incorrect password", errorCode:2});
			}else{
				res.send({error:err});
			}
			return;
		}	
		if(!user) {
			res.send({error: "Auth function contains error"});
		}
		else {
			res.send(user);
		}
	});
}





function _signup(body, fn){
	console.log(body);
	if(!body.username || !body.password){
		fn("no username or password");
		return;
	}

^^if(code){$$
	if(!body.code){
		fn("no validation code");
		return;
	}
	require("../models/^^=code$$").method.VerifyCode({
		id: body.username,
		code: body.code,
		minutes: 3
	}, function(err, valid){	
		if(err){
			fn(err);
			return;
		}
		if(!valid){
			fn("validation code error");
			return;
		}
^^}$$
		var json = {};
		var user = json.^^=schema.usernameField$$ = body.username;
		var pass = json.^^=schema.passwordField$$ = body.password;
	  var model = new User(json);
		model.save(function(err, doc) {
    	if (err)
				fn(err);
			else{
^^if(signinAfterSignup){$$
				auth(user, pass, function(err, user, message){
					if(err) fn("signin after signup err");
					else fn(null, user);
				});
^^}else{$$
				fn(null, {
					id: doc.^^=schema.idField$$,
					username: doc.^^=schema.usernameField$$
				});
^^}$$
			}
		});
^^if(code){$$
	});
^^}$$
}
function signup(req, res){
	_signup(req.body, function(err, result){
		if(err) res.send({error: err});
		else res.send(result);
	});
}

function _checkDuplicateUser(username, fn){
	User.method.get({"^^=schema.usernameField$$": username}, null, function(err, result){
		if(err) fn(err);
		else 
			fn(null, !result);
	});
}
module.exports.auth = auth;
module.exports.signup = signup;
module.exports.signin = signin;
module.exports._signin = _signin;
module.exports._signup = _signup;
module.exports._checkDuplicateUser = _checkDuplicateUser;


