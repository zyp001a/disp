var utils = require('../utils');
var async = require('async');
^^if(engine == "mongo"){$$
var mongoose = require('mongoose');
^^
var autoIncField = false;

function getDefault(field){
	switch(field.default){	
		case "now":
			return ", default: Date.now";
			break;
		case "autoinc":
			autoIncField = field.name;
			return "";
			break;
	}
}

$$
// Define our user schema
var json = {};
^^var uniques = [];fields.forEach(function(field){$$
json.^^=field.name$$ = { type: ^^=dbdef.getType(field, "mongoose")$$^^if(field.required){$$, required: true^^}$$^^if(field.default){$$^^=getDefault(field)$$^^}$$ };
^^if(field.unique){
uniques.push("\""+field.name+"\": 1");
}$$
^^})$$
var ^^=ucfirst(name)$$Schema = new mongoose.Schema(json);


^^if(autoIncField){$$
var AutoIncSchema = new mongoose.Schema({
	next: Number
});
var AutoIncModel = mongoose.model('^^=name$$_next', AutoIncSchema);

^^}$$
// Define our user schema



^^if(passwordField || autoIncField){$$
// Execute before each user.save() call
^^=ucfirst(name)$$Schema.pre('save', function(callback) {
  var model = this;


^^fields.forEach(function(f){if(f.encrypt){$$
  // Break out if the password hasn't changed
  if (model.isModified('^^=f.name$$')){
  // Password changed so we need to hash it
		model.^^=f.name$$ = utils.encrypt.bcrypt(model.^^=f.name$$, 5);
	}
^^}})$$

	^^if(autoIncField){$$
	if(!model.^^=autoIncField$$){
		AutoIncModel.findOne({}, function(err, nexti){
			model.^^=autoIncField$$ = nexti.next;
			callback(err);
		})
	}else{
		callback();
	}
	^^}else{$$
	callback();
	^^}$$
	
});
^^}$$

^^if(autoIncField){$$
^^=ucfirst(name)$$Schema.post('save', function(doc) {
	AutoIncModel.findOneAndUpdate({}, {"$inc": {"next":1}}, function(err, nexti){
		if(err){
			console.log(err);
		}
	});
});
^^}$$

^^if(passwordField){$$
^^=ucfirst(name)$$Schema.methods.verifyPassword = function(password, cb) {
	^^if(dbdef.getField(passwordField, fields).encrypt){$$
  utils.encrypt.bcryptcompare(password, this.^^=passwordField$$, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
	^^}else{$$	
	cb(null, this.^^=passwordField$$ == password);
	^^}$$
};
^^}$$

^^if(tokenField){$$
var hat = require("../utils").hat;

^^=ucfirst(name)$$Schema.methods.getToken = function(cb) {
	if(!this.^^=tokenField$$){
		var token = hat();	
		this.^^=tokenField$$ = token;
		this.save(function(){
			cb(null, token);
		});
	}else{
			cb(null, this.^^=tokenField$$);
	}
}
^^}$$




var Model = mongoose.model('^^=name$$', ^^=ucfirst(name)$$Schema);
^^if(autoIncField){$$
Model.autoinc = AutoIncModel;
^^}$$

Model.method = {};
Model.method.get = function(where, fields, fn){
	if(typeof where == "string" || typeof where == "number")
		where = {^^=idField$$: where};
	Model.findOne(where, fields, fn);
}
Model.method.gets = function(criteria, fields, fn){
	var sort, limit, skip;
	if(criteria.sort){
		sort = criteria.sort;
		delete criteria.sort;
	}
	if(criteria.skip){
		skip = criteria.skip;
		delete criteria.skip;
	}
	if(criteria.limit){
		limit = criteria.limit;
		delete criteria.limit;
	}

	var obj = Model.find(criteria, fields);
	if(sort) obj = obj.sort(sort);
	if(skip) obj = obj.skip(skip);
	if(limit) obj = obj.limit(limit);
	obj.exec(function(err, docs){
    if (err)
			fn(err);
		else{
			fn(null, docs);
		}
	});
}
Model.method.getsPage = function(criteria, fields, page, fn){

}
Model.method.post = function(doc, fn){
  var model = new Model(filter(doc));
  model.save(function(err, doc) {
    if (err)
			fn(err);
		else{
			fn(null, {insertId: doc.^^=idField$$});
		}
  });
}
Model.method.put = function(where, doc, fn){
	if(typeof where == "string" || typeof where == "number")
		where = {"^^=idField$$": where};
	Model.findOne(where, function(err, ori_doc){
    if (err){	fn(err); return;}
		if(!ori_doc){
			fn("no doc find");
			return;
		}
		^^fields.forEach(function(field){$$
	  if(doc.^^=field.name$$ && doc.^^=field.name$$ != ori_doc.^^=field.name$$)
			ori_doc.^^=field.name$$ = doc.^^=field.name$$;
		^^})$$
		ori_doc.save(function(err){
			if(err)
				fn(err);
			else
				fn(null);
		});
	});
}
^^if(Object.keys(category).length){$$
^^for(var cate in category){$$
Model.method.put^^=ucfirst(cate)$$ = function(where, doc, fn){
	if(typeof where == "string" || typeof where == "number")
		where = {^^=idField$$: where};
	Model.findOne(where, function(err, ori_doc){
    if (err){ fn(err); return;};
		^^fields.forEach(function(field){if(field.category == cate){$$
	  if(doc.^^=field.name$$ && doc.^^=field.name$$ != ori_doc.^^=field.name$$)
			ori_doc.^^=field.name$$ = doc.^^=field.name$$;
		^^}})$$
		ori_doc.save(function(err){
			if(err)
				fn(err);
			else
				fn(null);
		});
	});
}
^^}$$
^^}$$
Model.method.delete = function(json, fn){
	Model.remove(json, function(err) {
    if (err) fn(err);
		else fn(null);
  });
}
Model.method.populate = function(callback){
//ensure uniqueness, mongoose unique has some unknown bug
	Model.findOne({}, function(err, json){
		if(err) {callback(err); return; }
		if(json) return;
^^if(uniques.length){$$
Model.collection.ensureIndex({ ^^=uniques.join(", ")$$ }, { "unique": true }, function(err){
	if(err) callback(err);
^^}$$

^^if(autoIncField){$$
AutoIncModel.findOne({}, function(err, json){
	if(err){ callback(err); return; }
	if(json && json.next) return;
	var ai = new AutoIncModel({next: 1});
	ai.save(function(err){
		if(err){ callback(err); return; }
^^}$$
^^if(passwordField && usernameField){$$

^^}$$
		callback(err);
^^if(autoIncField){$$
  });//ai.save
});//AutoIncModel.findOne
^^}$$

^^if(uniques.length){$$
});//Model.collection.ensureIndex
^^}$$

	}); //Model.findOne({}

}//Model.populate

Model.method.drop = function(fn){
	Model.collection.drop(function(err){
		var error = {}; 
		error.error = err;
		if(Model.autoinc)
			Model.autoinc.collection.drop(function(err){
				error.error2 = err;
				fn(error);
			});
		else
			fn(error);
	});
}

^^if(codeField){$$
^^
if(!idField || !timeField){
	console.error("has codeField but no idField and timeField");
	process.exit(1);
}
$$
Model.method.getTestCode = function(prefix){
	return prefix + "^^=codeField$$";
}
Model.method.VerifyCode = function(params, fn){
	var json = {
    "^^=idField$$": params.id,
    "^^=codeField$$": params.code,
    "^^=timeField$$": {
      $gt: new Date().getTime() - params.minutes*60000
    }
  };
	console.log(json);
	Model.findOne(json, function(err, doc){
		if(err){
			fn(err);
			return;
		}
		if(!doc){
			fn(null, false);
			return;
		}
		fn(null, true);
	});
}
^^}$$

^^}else if(engine == "mysql"){$$
^^
if(usernameField || passwordField || tokenField || codeField){
	console.error("usernameField || passwordField || tokenField || codeField is not supported");
	process.exit(1);
}
$$	


var mysql = require('../dbconn').mysql;
var bcrypt = require('bcrypt');

var createTableStr = "CREATE TABLE IF NOT EXISTS ^^=name$$ (";
^^len = fields.length;fields.forEach(function(f,i){$$
createTableStr += '^^=f.name$$ ^^=dbdef.getType(f, "mysql")$$';
 ^^if(dbdef.getType(f, "mysql") == "ENUM"){$$
createTableStr += ""
 ^^}$$
 ^^if(f.default == "autoinc"){$$
createTableStr += " AUTO_INCREMENT";
 ^^}$$																		
 ^^if(f.default == "now"){$$
createTableStr += " DEFAULT NOW()";
 ^^}$$
 ^^if(f.unique){$$
createTableStr += " UNIQUE";
 ^^}$$		
 ^^if(f.required){$$
createTableStr += " NOT NULL";
 ^^}$$		
 ^^if(f.name == idField){$$
createTableStr += " PRIMARY KEY";
 ^^}$$
 ^^if(i != len-1){$$
createTableStr += ", ";
 ^^}$$									 
^^})$$
createTableStr += ");";
var Model = {};
Model.method = {};
Model.method.populate = function(fn){
	mysql.query(createTableStr, function(err, info){
		if(err){
			console.error("create table ^^=name$$ failed\n" + err.toString() + "\n" + createTableStr);
			fn(err);
		}else{
			fn(null);
		}
	});
};
Model.method.gets = function(criteria, cols, fn){
	var sort, limit, skip, key;
	if(criteria.sort){
		sort = criteria.sort;
		delete criteria.sort;
	}
	if(criteria.skip){
		skip = criteria.skip;
		delete criteria.skip;
	}
	if(criteria.limit){
		limit = criteria.limit;
		delete criteria.limit;
	}
	var selectStr = mysql.getSelectStr(criteria, cols, "^^=name$$");
	if(sort){
		var sorts = [];
		for (key in sort){
			if(sort[key]==-1)
				sorts.push(key + " DESC");
			else
				sorts.push(key + " ASC");
		}
		selectStr += " ORDER BY " + sorts.join(", ");
	}
	if(limit){
		selectStr += " LIMIT "+limit;
		if(skip){
			selectStr += ", "+skip;
		}
	}
	if(skip && !limit)
		console.error("skip must be used with limit for mysql");
	console.log(selectStr);
	mysql.query(selectStr, function(err, models){
    if (err)
      fn(err);
		else
			fn(null, models);
  });
}
Model.method.get = function(where, cols, fn){
	if(typeof where == "string" || typeof where == "number")
		where = {"^^=idField$$": where};

	mysql.query(mysql.getSelectStr(where, cols, "^^=name$$") + " LIMIT 1", function(err, models){
    if (err)
      fn(err);
		else
			if(models.length){
				fn(null, models[0]);
			}else{
				fn(null, null);
			}
  });
}
Model.method.post = function(doc, fn){
  mysql.query(mysql.getInsertStr(filter(doc), "^^=name$$"), function(err, result){
    if (err)
      fn(err);
		else
			fn(null, result);//result contains insertId
	});
}
Model.method.delete = function(json, fn){
  mysql.query(mysql.getDeleteStr(json, "^^=name$$"), function(err, result){
    if (err)
      fn(err);
		else
			fn(null, result);//result contains insertId
	});
}
Model.method.put = function(where, doc, fn){
	if(typeof where == "string" || typeof where == "number")
		where = {"^^=idField$$": where};
	console.log(mysql.getUpdateStr(where, filter(doc), "^^=name$$"));
	mysql.query(mysql.getUpdateStr(where, filter(doc), "^^=name$$"), function(err, result){
		if(err) {fn(err); return;}
		if(result.affectedRows)
			fn(null);
		else
			fn("nothing updated");
	});
}
Model.method.drop = function(fn){
	mysql.query("DROP TABLE ^^=name$$", function(err, result){
		fn(err);
	});
}

^^}$$


^^fields.forEach(function(f){if(f.encrypt){$$
Model.method.verifyId^^=ucfirst(f.name)$$ = function(id, password, cb) {
	Model.method.get(id, {"^^=f.name$$":1}, function(err, result){
		utils.encrypt.bcryptcompare(password, result.^^=f.name$$, function(err, isMatch) {
			if (err) return cb(err);
			cb(null, isMatch);
		});
	});
}
^^}})$$

Model.method.posts = function(array, fn){
	async.eachSeries(array, Model.method.post, function(err){
		if(err) fn(err);
		else fn(null, {success: true});
	});
}

Model.method.generateTest = function(){
	var json = {};

	^^fields.forEach(function(field){if(!field.auto){$$
	json.^^=field.name$$ = ^^=dbdef.getType(field, "jstest")$$;
	^^}})$$
	
	return json;
}
function filter(doc){
  var json = {};
	^^fields.forEach(function(field){$$
	if(doc.^^=field.name$$)
		json.^^=field.name$$ = doc.^^=field.name$$;
	^^})$$
	return json;
}
Model.method.filter = filter;
// Export the model
module.exports = Model;
