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
		case "BigInteger":
			return "BIGINT";
		case "SmallInteger":
			return "SMALLINT";
		case "TinyInteger":
			return "TINYINT";
		default:
			return f.type.toUpperCase();//boolean integer datetime
	}
}
$$
var createTableStr = "CREATE TABLE IF NOT EXISTS ^^=name$$ (";
^^len = fields.length;fields.forEach(function(f,i){$$
createTableStr += '^^=f.name$$ ^^=getType(f)$$';
 ^^if(f.default == "autoinc"){$$
createTableStr += " AUTO_INCREMENT";
 ^^}$$																		
 ^^if(f.default == "now"){$$
createTableStr += " DEFAULT NOW()";
 ^^}$$
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
		mysql.query("DROP TABLE ^^=name$$", function(err){
			if(err) console.error("drop table ^^=name$$ failed\n");
			process.exit(1);
		});
	}	
});



