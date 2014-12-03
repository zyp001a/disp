// Load required packages
var passport = require('passport');
var User = require('../models/^^=database$$');


^^if(strategy == 'basic'){$$
var BasicStrategy = require('passport-http').BasicStrategy;
//TODO
^^}else if(strategy == 'local'){$$
var LocalStrategy = require('passport-local').Strategy;
function authenticate(username, password, done) {
  User.findOne({ '^^=usernameField$$': username }, function(err, user) {
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
    usernameField: '^^=usernameField$$',
    passwordField: '^^=passwordField$$'
},authenticate));
exports.auth = authenticate;
exports.authMidware = passport.authenticate('^^=name$$', {
  failureRedirect: '/^^=signin$$',
//  failureFlash: true,
	session : false 
});
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
  User.findOne({ '^^=usernameField$$': username }, function(err, user) {
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
							username: user.^^=usernameField$$,
							token: token
						});
					}
				});
			}
      else return done({ message: 'Incorrect password.' });
    });
  });
}
module.exports.auth = auth;
