// Load required packages
var mysql = require('../dbconn').mysql;
var bcrypt = require('bcrypt');


var createTableStr = "CREATE TABLE IF NOT EXISTS ^^=name$$ (";
^^len = fields.length;fields.forEach(function(f,i){$$
createTableStr += '^^=f.name$$ ^^=dbdef.getType(f, "mysql")$$';
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
var Model = {};
Model.find = function(){
}
Model.update = function(){
}
Model.findOne = function(){
}
Model.remove = function(){
}

module.exports = Model;

