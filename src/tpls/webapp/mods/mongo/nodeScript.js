// Load required packages
var Model = require('../models/^^=name$$');
var mongoose = require("mongoose");
require("../dbconn");

console.log(process.argv[2]);

^^
function getExample(field){
	switch(field.type){
		case "DateTime":
			return "new Date(1)";
		case "Number":
			if(field.default == "autoinc")
				return 1;
			return "0.1";
		default:
			return "\"test"+field.name+"\"";
	}		
}
$$

switch(process.argv[2]){
	case "add":
		Model.populate(function(err){
			var json = {};
			^^fields.forEach(function(field){if(!field.default){$$
			json.^^=field.name$$ = ^^=getExample(field)$$;
			^^}})$$
			console.log(json);
  		var model = new Model(json);
  		model.save(function(err) {
				console.error({error: err});
				process.exit(1);
			});
		});
		break;
	case "drop":
		Model.collection.drop(function(err){
			console.log({error:err});
			if(Model.autoinc)
				Model.autoinc.collection.drop(function(err){
					console.log({error2:err});
					process.exit();
				});
			else
				process.exit();
		});
		break;
	
	case "pop":
		Model.collection.drop(function(){
			if(Model.autoinc)
				Model.autoinc.collection.drop(function(){
					Model.populate(function(err){
						console.log({error:err});						
						process.exit(1);
					});
				});
			else
				Model.populate(function(err){
					console.log({error:err});						
					process.exit(1);
				});

		});
		break;
}
