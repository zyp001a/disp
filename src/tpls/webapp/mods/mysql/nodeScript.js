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
			if(field.default == "autoinc")
				return 1;
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
	console.log(mysql.getInsertStr(json, "^^=name$$"));

  mysql.query(mysql.getInsertStr(json, "^^=name$$"), function(err, models){
    console.log({error: err});
		process.exit(1);
  });

}
else if(process.argv[2] == "drop"){
	mysql.query("DROP TABLE ^^=name$$", function(err, models){
    console.log({error: err});
		process.exit(1);
  });
}
else{
	process.exit(1);
}
