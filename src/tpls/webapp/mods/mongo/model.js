// Load required packages
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
^^
function getType(field){
	if(field.isArray)
		return Array;
	switch(field.type){
		case "Index":
			return "Number";
		case "Integer":
			return "Number";
		case "Number":
			return "Number";
		case "Boolean":
			return "Boolean";
		case "String":
			return "String";
		case "Text":
			return "String";
		case "Select":
			return "String";
		case "Date":
			return "String";
		case "Time":
			return "String";
		case "DateTime":
			return "Date";
		case "Buffer":
			return "Buffer";
		default:
			return "String";
	}
}
$$
// Define our user schema
var json = {};
^^fields.forEach(function(field){$$
	json.^^=field.name$$ = { type: ^^=getType(field)$$^^if(field.required){$$, required: true^^}$$ };
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
^^if(tokenField){$$
function hat(bits, base) {                                               
  if (!base) base = 16;                                                         
  if (bits === undefined) bits = 128;                                           
  if (bits <= 0) return '0';                                                    
  var digits = Math.log(Math.pow(2, bits)) / Math.log(base);                    
  for (var i = 2; digits === Infinity; i *= 2) {                                
    digits = Math.log(Math.pow(2, bits / i)) / Math.log(base) * i;              
  }                                                                             
  var rem = digits - Math.floor(digits);                                        
  var res = '';                                                                 
  for (var i = 0; i < Math.floor(digits); i++) {                                
    var x = Math.floor(Math.random() * base).toString(base);                    
    res = x + res;
  }
  if (rem) {
    var b = Math.pow(base, rem);
    var x = Math.floor(Math.random() * b).toString(base);
    res = x + res;
  }
  var parsed = parseInt(res, base);
  if (parsed !== Infinity && parsed >= Math.pow(2, bits)) {
    return hat(bits, base)
  }
  else return res;
}

UserSchema.methods.getToken = function(cb) {
	if(!this.^^=tokenField$$){
		var token = hat();	
		this.^^=tokenField$$ = token;
		this.save(function(){
			cb(null, token);
		});
	}else{
			cb(null, this.^^=tokenField$$);
	}
}
^^}$$

// Export the Mongoose model
var Model = mongoose.model('^^=name$$', UserSchema);
module.exports = Model;

^^if(passwordField && usernameField){$$

var user = new Model({

	"^^=usernameField$$":"admin",
	"password":"admin",
	"token":"admin",
	"isAdmin": true
});
Model.remove({"^^=usernameField$$": "admin"}, function(err){
	user.save();
});

^^}$$
