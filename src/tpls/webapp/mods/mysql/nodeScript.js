// Load required packages

var mysql = require('../dbconn').mysql;
var Model = require('../models/^^=name$$');



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
	^^fields.forEach(function(field){$$
	json.^^=field.name$$ = ^^=getExample(field)$$;
	^^})$$
	console.log(json);

  mysql.query(mysql.getInsertStr(json, "^^=name$$"), function(err, models){
    if (err)
      console.log(err);
    else
      console.log({ message: 'insert successful' });
  });

}
else{

}
