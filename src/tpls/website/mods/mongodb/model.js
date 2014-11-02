// Load required packages
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

// Define our user schema
var json = {};
^^fields.forEach(function(field){$$
	json.^^=field.name$$ = 
	{	type: ^^=field.type$$^^if(field.required){$$, required: true^^}$$};
^^})$$
var UserSchema = new mongoose.Schema(json);

^^if(passwordField){$$
// Execute before each user.save() call
UserSchema.pre('save', function(callback) {
  var user = this;

  // Break out if the password hasn't changed
  if (!user.isModified('^^=passwordField$$')) return callback();

  // Password changed so we need to hash it
  bcrypt.genSalt(5, function(err, salt) {
    if (err) return callback(err);

    bcrypt.hash(user.^^=passwordField$$, salt, function(err, hash) {
      if (err) return callback(err);
      user.^^=passwordField$$ = hash;
      callback();
    });
  });
});

UserSchema.methods.verifyPassword = function(password, cb) {
  bcrypt.compare(password, this.^^=passwordField$$, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};
^^}$$

// Export the Mongoose model
var User = mongoose.model('User', UserSchema);
module.exports = User;

var user = new User({
	"username":"admin",
	"password":"admin",
	"isAdmin": true
});
user.save();
