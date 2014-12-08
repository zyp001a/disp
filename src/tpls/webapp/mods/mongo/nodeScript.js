// Load required packages
var Model = require('../models/^^=name$$');
var mongoose = require("mongoose");
mongoose.connect('mongodb://^^=mongodb.path$$');

console.log(process.argv[2]);

^^
function getExample(field){
	switch(field.type){
		case "DateTime":
			return "new Date(1)";
		case "Number":
			return "0.1";
		default:
			return "\"test"+field.name+"\"";
	}		
}
$$

if(process.argv[2] == "add"){
	var json = {};
	^^fields.forEach(function(field){if(!field.default){$$
	json.^^=field.name$$ = ^^=getExample(field)$$;
	^^}})$$
	console.log(json);
  var model = new Model(json);
  model.save(function(err) {
    if (err)
      console.error(err);
		else
			console.log({ message: 'insert successful' });
		process.exit(1);
  });
}
else{

}
