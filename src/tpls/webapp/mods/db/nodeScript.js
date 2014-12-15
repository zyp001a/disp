// Load required packages
var Model = require('../models/^^=name$$');
require("../dbconn");

console.log(process.argv[2]);

function add(){
	Model.method.populate(function(err){
		if(err)
			console.error(err);

		var json = Model.method.generateTest();
		console.log(json);
		Model.method.post(json, function(err, doc){
			if(err) console.error(err);
			process.exit(1);				
		});
	});
}
switch(process.argv[2]){
	case "add":
		add();	
		break;
	case "drop":
		Model.method.drop(function(err){
			if(err) console.error(err);
			process.exit(1);
		});
		break;
	case "pop":
		Model.method.drop(function(err){
			if(err) console.error(err);
			add();
		});
		break;
}
