
^^if(mongo){$$
var mongoose = require("mongoose");
if(process.env.NODE_ENV == "test"){
//	mongoose.set('debug', true);
	mongoose.connect('mongodb://^^=test.mongo.path$$');
}else{
	mongoose.connect('mongodb://^^=mongo.path$$');
}
^^}$$
^^if(mysql){$$
var mysql = require("mysql");
var FFI = require("node-ffi");
var libc = new FFI.Library(null, {
  "system": ["int32", ["string"]]
});
var run = libc.system;

if(process.env.NODE_ENV != "test"){
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
}else{
	run('mysql -h ^^=test.mysql.host$$ -u ^^=test.mysql.user$$ ^^if(test.mysql.password){$$-p^^=test.mysql.password$$ ^^}$$-e "CREATE DATABASE IF NOT EXISTS ^^=test.mysql.db$$"');
	var mysqlConn = mysql.createPool({
		connectionLimit : 10,
		host     : '^^=test.mysql.host$$',
		user     : '^^=test.mysql.user$$',
^^if(mysql.password){$$
		password : '^^=test.mysql.password$$',
^^}$$
		database : '^^=test.mysql.db$$'
	});

}


//mysqlConn.connect();
mysqlConn.getInsertStr = function(json, table){
	var cols = [];
	var values = [];
	for (var key in json){
		switch(typeof json[key]){
			case "string":
				cols.push(key);
				values.push("'"+json[key]+"'");
				break;
			case "object":
				console.log(typeof json[key]);
				break;
			default:
				cols.push(key);
				values.push(json[key]);
		}
	}
	return "INSERT INTO " + table + "(" + cols.join(", ") + ") VALUES (" + values.join(", ") + ")";
}
function genEqualStr(where, sep){
	if(!sep) sep = " and ";
	var whereStr, key;
	if(!where)
		whereStr = "";
	else{
		var wheres = [];
		for (key in where){
			switch(typeof where[key]){
				case "string":
					wheres.push(key + " = " + "'"+where[key]+"'");
					break;
				case "object":
					console.log(typeof where[key]);
					break;
				default:
					wheres.push(key + " = " + where[key]);
			}
		}
		whereStr = wheres.join(sep);
	}
	return whereStr;
}
mysqlConn.getSelectStr = function(where, coljson, table){
	var colStr, key;
	var cols = [];
	for (key in coljson)	cols.push(key);
	colStr = cols.join(", ");
	if(!colStr) colStr = "*";
	var str = "SELECT "+colStr +" FROM " + table;
	if(where && Object.keys(where).length)
		str += " WHERE " +  genEqualStr(where);	
	return str;
}
mysqlConn.getUpdateStr = function(where, doc, table){
	var str = "UPDATE "+table + " SET "+ genEqualStr(doc, ", ");
	if(where && Object.keys(where).length)
		str += " WHERE " +  genEqualStr(where);
	return str;
}
mysqlConn.getDeleteStr = function(where, table){
	var str = "DELETE FROM " + table;
	if(where && Object.keys(where).length)
		str += " WHERE " +  genEqualStr(where);
	return str;
}

exports.mysql = mysqlConn;
^^}$$
