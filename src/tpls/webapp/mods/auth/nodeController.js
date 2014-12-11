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
      return done({ message: 'Incorrect username.' });
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
      else return done({ message: 'Incorrect password.' });
    });
  });
}

function signin(req, res){
	auth(req.body.username, req.body.password, function(err, user, message){
		if(err) res.status(401).send({error:err});
		else if(!user) res.status(401).send({error:"no user"});
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

function signup(req, res){
	var json = {};
^^schema.fields.forEach(function(field){$$
 ^^if(field.required && !field.default){$$	
	if(req.body.^^=field.name$$)
		json.^^=field.name$$ = req.body.^^=field.name$$;
	else{
		res.status(401).send({error: "param ^^=field.name$$ not exist"});
		return;
	}
 ^^}$$
^^})$$
	var user = json.^^=schema.usernameField$$;
	var pass = json.^^=schema.passwordField$$;
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
}

module.exports.auth = auth;
module.exports.signup = signup;
module.exports.signin = signin;

