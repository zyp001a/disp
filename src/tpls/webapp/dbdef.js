var table = {};
table.Boolean = table.bool = table.boolean = {
	"name": "bool",
	"basic": "int",
	"mongoose": "Boolean",
	"mysql": "BOOLEAN",
	"sqlite": "INTEGER",
	"java": "boolean",
	"js": "boolean",
	"jstest": "true"
};
table.Integer = table.int = table.Int = {
	"name": "int",
	"basic": "int",
	"mongoose": "Number",
  "mysql": "INT",
  "sqlite": "INTEGER",
  "java": "int",
  "js": "number",
	"jstest": "1"
};
table.TinyInteger = table.tinyint = table.TinyInt = {
	"name": "tinyint",
	"basic": "int",
	"mongoose": "Number",
  "mysql": "TINYINT",
  "sqlite": "INTEGER",
  "java": "int",
  "js": "number",
	"jstest": "1"
};
table.SmallInteger = table.smallint = table.SmallInt = {
	"name": "smallint",
	"basic": "int",
	"mongoose": "Number",
  "mysql": "SMALLINT",
  "sqlite": "INTEGER",
  "java": "int",
  "js": "number",
	"jstest": "1"
};
table.MediumInteger = table.mediumint = table.MediumInt = {
	"name": "mediumint",
	"basic": "int",
	"mongoose": "Number",
  "mysql": "MEDIUMINT",
  "sqlite": "INTEGER",
  "java": "int",
  "js": "number",
	"jstest": "1"
};
table.BigInteger = table.bigint = table.BigInt = {
	"name": "bigint",
	"basic": "int",
	"mongoose": "Number",
  "mysql": "BIGINT",
  "sqlite": "INTEGER",
  "java": "long",
  "js": "number",
	"jstest": "1"
};
table.Number = table.number = table.num 
	= table.double = table.Double = {
		"name": "double",
	"basic": "long",
	"mongoose": "Number",
  "mysql": "DOUBLE",
  "sqlite": "REAL",
  "java": "double",
  "js": "number",
	"jstest": "0.1"
};
table.Float = table.float = {
	"name": "float",
	"basic": "double",
	"mongoose": "Number",
  "mysql": "FLOAT",
  "sqlite": "REAL",
  "java": "double",
  "js": "number",
	"jstest": "0.1"
};

table.Date = table.date = {
	"name": "date",
	"basic": "string",
	"mongoose": "String",
  "mysql": "DATE",
  "sqlite": "TEXT",
  "java": "Date",
  "js": "object",
	"jstest": "'1970-01-01'"
};
table.DateTime = table.datetime = {
	"name": "datetine",
	"basic": "string",
	"mongoose": "Date",
  "mysql": "DATETIME",
  "sqlite": "TEXT",
  "java": "Date",
  "js": "object",
	"jstest": "new Date()"
};
table.Char = table.char = {
	"name": "char",
	"basic": "string",
	"mongoose": "String",
  "mysql": "CHAR",
  "sqlite": "TEXT",
  "java": "String",
  "js": "string",
	"jstest": "'a'"
};
table.VarChar = table.varchar = {
	"name": "varchar",
	"mongoose": "String",
  "mysql": "VARCHAR",
  "sqlite": "TEXT",
  "java": "String",
  "js": "string",
	"jstest": "'a'"
};
table.String = table.string = {
	"name": "string",
	"basic": "string",
	"mongoose": "String",
  "mysql": "VARCHAR(100)",
  "sqlite": "TEXT",
  "java": "String",
  "js": "string",
	"jstest": "'a'"
};
table.Array = table.array = {
	"name": "string",
	"basic": "string",
	"mongoose": "Array",
  "mysql": "VARCHAR(255)",
  "sqlite": "TEXT",
  "java": "List<String>",
  "js": "object",
	"jstest": "['1','2']"
};
table.Text = table.text = {
	"name": "string",
	"mongoose": "String",
  "mysql": "VARCHAR(255)",
  "sqlite": "TEXT",
  "java": "String",
  "js": "string",
	"jstest": "'a'"
};
table["enum"] = table.Enum = table.Index = table.index 
	= table.Select = table.select = {
	"name": "enum",
	"basic": "string",
	"mongoose": "Number",
  "mysql": "ENUM",
  "sqlite": "INTEGER",
  "java": "char",
  "js": "number",
	"jstest": 1
};
table.Path = table.path = {
	"name": "path",
	"basic": "string",
	"mongoose": "String",
  "mysql": "VARCHAR(255)",
  "sqlite": "TEXT",
  "java": "String",
  "js": "string",
	"jstest": "'a'"
};

table.Buffer = table.buffer = table.Blob = table.blog = {
	"name": "buffer",
	"basic": "string",
	"mongoose": "Buffer",
	"mysql": "BLOB",
	"sqlite": "BLOB",
	"java": "String",
	"js": "string",
	"jstest": "'a'"
};

/*
table.Set = table.set = table.mulitselect = table.MultiSelect = {
	"name": "set",
	"js": ""
};
*/

function getType(f, c, prefix){

	if(!f.type){
		console.error("no type for schema "+JSON.stringify(f));
		process.exit(1);
	}
	if(!c){
		console.error("no class, should be mongoose, mysql ... ");
		process.exit(1);
	}
	if(c=="jstest" && table[f.type].basic == "string"){
		if(!prefix) prefix = "test";
		return "'" + prefix +f.name + "'";
	}
		
	var v = table[f.type][c];
	if(v) return v;
	else {
		console.error("undefied type: "+f.type);
		process.exit(1);
	}
}
function getField(name, fields){
	var field;
	fields.forEach(function(f){
		if(f.name == name)
			field = f;
	});
	return field;
}
/* wrong methd
function generateTest(field, fields, prefix){
	var json = {};
	if(field){
		for (var key in field){
			json[key] = getType(getField(key, fields), "jstest", prefix);
		}
	}
	else{
		fields.forEach(function(f){
			json[f.name] = getType(f, "jstest", prefix);
		});
	}
	return json;
}
*/
module.exports.getType = getType;
module.exports.getField = getField;
//module.exports.generateTest = generateTest;
