// Load required packages
var Model = require('../models/^^=name$$');
Model.method.populate(function(err){
	if(err) console.log(err);
});

^^if(path){$$
var path = require("path");
var fs = require("fs");

 ^^uploadApis.forEach(function(api){$$
exports.upload^^=ucfirst(api.name)$$ = function(req, res){
	console.log("UPLOAD");
	console.log(req.params);
	console.log(req.files);
	var id = req.params.id;
	if(!id){
		res.send({error: "no id " + id});
    return;
	}
	if(!req.files.buffer){
		res.send({error: "no file"});
    return;
  }
//	var id = req.files.image.name.match(/(\S+)\.\S+$/)[1];
	var name = path.basename(req.files.buffer.path);
	Model.method.put(id, {"^^=api.name$$": name}, function(err){
		if(err){
			res.send({error: err});
			return;
		}
		res.send({
			"^^=idField$$": id,
			"^^=api.name$$": name
		});
	});
}

exports.download^^=ucfirst(api.name)$$ = function(req, res){
	var fpath = path.resolve("^^=path$$/^^=name$$/^^=api.name$$/" + req.params.filename);
	console.log(fpath);
	if(fs.existsSync(fpath)){
^^if(api.media != "image"){$$
^^}else{$$
		res.setHeader('Content-Type', 'image/jpeg');
^^}$$
		res.send(fs.readFileSync(fpath));
	}
	else
		res.status(500).send({error: "not exist"});
}
 ^^})$$
^^}$$



^^apis.forEach(function(api){$$
 ^^if(api.type == "gets"){$$
exports.^^=api.name$$ = function(req, res) {
	^^if(!api.field){$$
	var cols = {};
	^^}else{$$
	var cols = ^^=JSON.stringify(api.field)$$;
	^^}$$
	^^if(api.criteria){$$
	var criteria = ^^=JSON.stringify(api.criteria)$$;
	^^}else{$$
	var criteria = {};
	^^}$$
	^^if(api.by){$$
	criteria.^^=api.by$$ = req.params.^^=api.by$$;
  ^^}$$
  Model.method.gets(criteria, cols, function(err, models) {
    if (err)
      res.send(err);
		else
			res.send(models);
  });
};
 ^^}else if(api.type == "post"){$$
exports.^^=api.name$$ = function(req, res) {
	console.log("POST ^^=api.name$$");
	console.log(req.body);

	if(!Object.keys(req.body).length){
		res.send({error: "no postdata"});
		return;
	}

	Model.method.post(req.body, function(err, doc){
		if(err)
      res.send({ error: err });
		else{

			res.send({ success: true, insertId: doc.insertId});
		}
  });
};
 ^^}else if(api.type == "get"){$$
exports.^^=api.name$$ = function(req, res) {
	console.log("GET ^^=api.name$$");
	console.log(req.params);
	if(!req.params.id){
		res.send({error: "no id"});
		return;
	}
	var json = {};
	^^if(api.notEncrypt){
		fields.forEach(function(f){
			if(f.encrypt){$$
	json.^^=f.name$$ = false;
			^^}
		});
	}$$
	^^if(api.field){$$
	var field = ^^=JSON.stringify(api.field)$$;
	for (var key in field)
		json[key] = field[key];
	^^}$$
  // Use the Beer model to find a specific beer
  Model.method.get({ "^^=idField$$": req.params.id }, json, function(err, model) {
    if (err)
      res.send({error: err});
		else
			res.send(model);
  });
};

 ^^}else if(api.type == "put"){$$
exports._^^=api.name$$ = _^^=api.name$$;
exports.^^=api.name$$ = function(req, res){
	_^^=api.name$$(req.params.id, req.body, function(err, result){
		if(err) res.send({error: err});
		else res.send(result);
	});
}
function _^^=api.name$$(id, body, fn) {
	console.log(body);
	console.log(id);
	if(!id){
		fn("no id");
		return;
	}
	if(!Object.keys(body).length){
		fn("no postdata");
		return;
	}

	^^if(!api.field){$$
	var doc = body;
	^^}else{$$
	var doc = {}
	 ^^for (var f in api.field){$$
	doc.^^=f$$ = body.^^=f$$;
	 ^^}$$
	^^}$$

	^^if(api.code){$$
	if(!body.code){
		fn("no validation code");
		return;
	}
	var where = {};
	^^if(api.idField){$$
	where.^^=api.idField$$ = id;
	^^}else{$$
	where.^^=idField$$ = id;
  ^^}$$
	Model.method.get(where, { "^^=usernameField$$": 1}, function(err, userdoc){
		console.log(userdoc);
		if(err){
			fn(err);
			return;
		}
		require("../models/^^=api.code$$").method.VerifyCode({
			id: userdoc.^^=usernameField$$,
			code: body.code,
			minutes: 60
		}, function(err, valid){	
			if(err){
				fn(err);
				return;
			}
			if(!valid){
				fn("validation code error");
				return;
			}
	^^}$$
			Model.method.put({ "^^=idField$$": id }, doc, function(err) {
    		if (err)
					fn(err);
				else
					fn(null, {success: true});
			});
	^^if(api.code){$$
		});
	});
	^^}$$

};

 ^^}else if(api.type == "delete"){$$
exports.^^=api.name$$ = function(req, res) {
};
 ^^}$$
^^})$$


^^if(restful){$$
exports.post = function(req, res) {
	console.log("POST ^^=name$$");
	console.log(req.body);

	if(!Object.keys(req.body).length){
		res.send({error: "no postdata"});
		return;
	}

	Model.method.post(req.body, function(err, doc){
		if(err)
      res.send({ error: err });
		else{

			res.send({ success: true, insertId: doc.insertId});
		}
  });
};
exports.get = function(req, res) {
	console.log("GET ^^=name$$");
	console.log(req.params);
	if(!req.params.id){
		res.send({error: "no id"});
		return;
	}
  // Use the Beer model to find a specific beer
  Model.method.get({ "^^=idField$$": req.params.id }, {}, function(err, model) {
    if (err)
      res.send({error: err});
		else
			res.send(model);
  });
};

// Create endpoint for PUT
exports.put = function(req, res) {
	if(!req.params.id){
		res.send({error: "no id"});
		return;
	}
	if(!Object.keys(req.body).length){
		res.send({error: "no postdata"});
		return;
	}
  Model.method.put({ "^^=idField$$": req.params.id }, req.body, function(err) {
    if (err)
      res.send({error: err});
		else
			res.json({success: true});
  });
};

// Create endpoint for DELETE
exports.delete = function(req, res) {
	if(!req.params.id){
		res.send({error: "no id"});
		return;
	}
  Model.method.delete({ "^^=idField$$": req.params.id }, function(err) {
    if (err)
      res.send({error: err});
		else
			res.json({success: true});
  });
};
^^}$$
