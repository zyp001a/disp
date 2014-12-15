// Load required packages

var mysql = require('../dbconn').mysql;
var Model = require('../models/^^=name$$');



console.log(process.argv[2]);

if(process.argv[2] == "add"){
	var json = {};
	^^fields.forEach(function(field){$$
   ^^if(!field.default){$$
		 json.^^=field.name$$ = ^^=dbdef.getType(field, "jstest")$$;
   ^^}$$												
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
