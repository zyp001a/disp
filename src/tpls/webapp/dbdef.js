var table = {};
table.Boolean = table.bool = table.boolean = {
	"name": "bool",
	"mongoose": "Boolean",
	"mysql": "BOOLEAN",
	"sqlite": "INTEGER",
	"java": "boolean",
	"js": "boolean",
	"jstest": "true"
};
table.Integer = table.int = table.Int = {
	"name": "int",
	"mongoose": "Number",
  "mysql": "INT",
  "sqlite": "INTEGER",
  "java": "int",
  "js": "number",
	"jstest": "1"
};
table.TinyInteger = table.tinyint = table.TinyInt = {
	"name": "tinyint",
	"mongoose": "Number",
  "mysql": "TINYINT",
  "sqlite": "INTEGER",
  "java": "char",
  "js": "number",
	"jstest": "1"
};
table.SmallInteger = table.smallint = table.SmallInt = {
	"name": "smallint",
	"mongoose": "Number",
  "mysql": "SMALLINT",
  "sqlite": "INTEGER",
  "java": "int",
  "js": "number",
	"jstest": "1"
};
table.MediumInteger = table.mediumint = table.MediumInt = {
	"name": "mediumint",
	"mongoose": "Number",
  "mysql": "MEDIUMINT",
  "sqlite": "INTEGER",
  "java": "int",
  "js": "number",
	"jstest": "1"
};
table.BigInteger = table.bigint = table.BigInt = {
	"name": "bigint",
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
	"mongoose": "Number",
  "mysql": "DOUBLE",
  "sqlite": "REAL",
  "java": "double",
  "js": "number",
	"jstest": "0.1"
};
table.Float = table.float = {
	"name": "float",
	"mongoose": "Number",
  "mysql": "FLOAT",
  "sqlite": "REAL",
  "java": "float",
  "js": "number",
	"jstest": "0.1"
};

table.Date = table.date = {
	"name": "date",
	"mongoose": "String",
  "mysql": "DATE",
  "sqlite": "TEXT",
  "java": "Date",
  "js": "object",
	"jstest": "'1970-01-01'"
};
table.DateTime = table.datetime = {
	"name": "datetine",
	"mongoose": "Date",
  "mysql": "DATE",
  "sqlite": "TEXT",
  "java": "Date",
  "js": "object",
	"jstest": "new Date()"
};
table.Char = table.char = {
	"name": "char",
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
	"mongoose": "String",
  "mysql": "VARCHAR(100)",
  "sqlite": "TEXT",
  "java": "String",
  "js": "string",
	"jstest": "'a'"
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
	"mongoose": "Number",
  "mysql": "ENUM",
  "sqlite": "INTEGER",
  "java": "char",
  "js": "number",
	"jstest": 1
};
table.Path = table.path = {
	"name": "path",
	"mongoose": "String",
  "mysql": "VARCHAR(255)",
  "sqlite": "TEXT",
  "java": "String",
  "js": "string",
	"jstest": "'a'"
};

table.Buffer = table.buffer = table.Blob = table.blog = {
	"name": "buffer",
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

function getType(f, c){
	if(f.isArray){
		if(c=="mongoose"){
			return "Array";
		}
		if(c=="jstest"){
			return "['1','2']";
		}
	}
	if(!f.type){
		console.error("no type for schema "+JSON.stringify(f));
		process.exit(1);
	}
	if(!c){
		console.error("no class, should be mongoose, mysql ... ");
		process.exit(1);
	}
		
	var v = table[f.type][c];
	if(v) return v;
	else {
		console.error("undefied type: "+f.type);
		process.exit(1);
	}
}
module.exports.getType = getType;
