// Load required packages
var mysql = require('../dbconn').mysql;
var bcrypt = require('bcrypt');

^^
function getType(f){
	if(f.isArray){
		console.error("mysql don't support 'Array' field");
		process.exit(1);
	}
	switch(f.type){
		case "Number":
			return "DOUBLE";
		case "Index":
			return "INTEGER";
		case "Select":
			return "VARCHAR(40)";
		case "Date":
			return "VARCHAR(40)";
		case "Time":
			return "VARCHAR(40)";
		case "String":
			return "VARCHAR(100)";
		case "Text":
			return "VARCHAR(255)";
		default:
			return f.toUpperCase();//boolean integer datetime
	}
}
$$
var createTableStr = "CREATE TABLE IF NOT EXISTS ^^=name$$ (";
^^len = fields.length;fields.forEach(function(f,i){$$
createTableStr += '^^=f.name$$ ^^=getType(f)$$';
 ^^if(f.name == idField){$$
createTableStr += " PRIMARY KEY";
 ^^}$$
 ^^if(i != len-1){$$
createTableStr += ", ";
 ^^}$$									 
^^})$$
createTableStr += ");";
mysql.query(createTableStr, function(err, info){
	if(err){
		console.error("create table ^^=name$$ failed\n" + err.toString() + "\n" + createTableStr);
		process.exit(1);
	}	
});

/*
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
*/

