// Load required packages
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

^^
var autoIncField = false;
function getType(field){
	if(field.isArray)
		return Array;
	switch(field.type){
		case "Index":
			return "Number";
		case "BigInteger":
			return "Number";
		case "Integer":
			return "Number";
		case "SmallInteger":
			return "Number";
		case "TinyInteger":
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
		case "Path":
			return "String";
		default:
			return "String";
	}
}
function getDefault(field){
	switch(field.default){	
		case "now":
			return ", default: Date.now";
			break;
		case "autoinc":
			autoIncField = field.name;
			return "";
			break;
	}
}

$$
// Define our user schema
var json = {};
^^var uniques = [];fields.forEach(function(field){$$
json.^^=field.name$$ = { type: ^^=getType(field)$$^^if(field.required){$$, required: true^^}$$^^if(field.default){$$^^=getDefault(field)$$^^}$$ };
^^if(field.unique){
uniques.push("\""+field.name+"\": 1");
}$$
^^})$$
var ^^=ucfirst(name)$$Schema = new mongoose.Schema(json);


^^if(autoIncField){$$
var AutoIncSchema = new mongoose.Schema({
	next: Number
});
var AutoIncModel = mongoose.model('^^=name$$_next', AutoIncSchema);

^^}$$
// Define our user schema



^^if(passwordField || autoIncField){$$
// Execute before each user.save() call
^^=ucfirst(name)$$Schema.pre('save', function(callback) {
  var model = this;

	^^if(passwordField){$$
  // Break out if the password hasn't changed
  if (model.isModified('^^=passwordField$$')){
  // Password changed so we need to hash it
		var salt = bcrypt.genSaltSync(5);

		var hash = bcrypt.hashSync(model.^^=passwordField$$, salt);
		model.^^=passwordField$$ = hash;
	}
	^^}$$
	^^if(autoIncField){$$
	if(!model.^^=autoIncField$$){
		AutoIncModel.findOne({}, function(err, nexti){
			model.^^=autoIncField$$ = nexti.next;
			callback(err);
		})
	}else{
		callback();
	}
	^^}else{$$
	callback();
	^^}$$
	
});
^^}$$

^^if(autoIncField){$$
^^=ucfirst(name)$$Schema.post('save', function(doc) {
	AutoIncModel.findOneAndUpdate({}, {"$inc": {"next":1}}, function(err, nexti){
		if(err){
			console.log(err);
		}
	});
});
^^}$$

^^if(passwordField){$$
^^=ucfirst(name)$$Schema.methods.verifyPassword = function(password, cb) {
  bcrypt.compare(password, this.^^=passwordField$$, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};
^^}$$

^^if(tokenField){$$
var hat = require("../utils").hat;

^^=ucfirst(name)$$Schema.methods.getToken = function(cb) {
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




var Model = mongoose.model('^^=name$$', ^^=ucfirst(name)$$Schema);
^^if(autoIncField){$$
Model.autoinc = AutoIncModel;
^^}$$

Model.populate = function(callback){
//ensure uniqueness, mongoose unique has some unknown bug
	Model.findOne({}, function(err, json){
		if(err) {callback(err); return; }
		if(json) return;
^^if(uniques.length){$$
Model.collection.ensureIndex({ ^^=uniques.join(", ")$$ }, { "unique": true }, function(err){
	if(err) callback(err);
^^}$$

^^if(autoIncField){$$
AutoIncModel.findOne({}, function(err, json){
	if(err){ callback(err); return; }
	if(json && json.next) return;
	var ai = new AutoIncModel({next: 1});
	ai.save(function(err){
		if(err){ callback(err); return; }
^^}$$
^^if(passwordField && usernameField){$$

^^}$$
		callback(err);
^^if(autoIncField){$$
  });//ai.save
});//AutoIncModel.findOne
^^}$$


^^if(uniques.length){$$
});//Model.collection.ensureIndex
^^}$$


	}); //Model.findOne({}

}//Model.populate
// Export the Mongoose model
module.exports = Model;
