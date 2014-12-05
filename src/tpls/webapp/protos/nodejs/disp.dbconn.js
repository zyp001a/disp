^^if(mongodb){$$
var mongoose = require("mongoose");
mongoose.connect('mongodb://^^=mongodb.path$$');
^^}$$
^^if(mysql){$$
var mysql = require("mysql");
var FFI = require("node-ffi");
var libc = new FFI.Library(null, {
  "system": ["int32", ["string"]]
});
var run = libc.system;
run('mysql -h ^^=mysql.host$$ -u ^^=mysql.user$$ ^^if(mysql.password){$$-p^^=mysql.password$$ ^^}$$-e "CREATE DATABASE IF NOT EXISTS ^^=mysql.db$$"');
var mysqlConn = mysql.createPool({
	connectionLimit : 10,
  host     : '^^=mysql.host$$',
  user     : '^^=mysql.user$$',
^^if(mysql.password){$$
  password : '^^=mysql.password$$',
^^}$$
	database : '^^=mysql.db$$'
});
//mysqlConn.connect();
mysqlConn.getInsertStr = function(json, table){
	var cols = [];
	var values = [];
	for (var key in json){
		cols.push(key);
		switch(typeof json[key]){
			case "string":
				values.push("'"+json[key]+"'");
				break;
			default:
				values.push(json[key]);
		}
	}
	return "INSERT INTO " + table + "(" + cols.join() + ") VALUES (" + values.join() + ");";
}
exports.mysql = mysqlConn;
^^}$$
