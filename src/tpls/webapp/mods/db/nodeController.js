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
	if(!req.files.buffer){
		res.send({error: true});
    return;
  }
//	var id = req.files.image.name.match(/(\S+)\.\S+$/)[1];
	res.send({path: path.basename(req.files.buffer.path)});
}

exports.download^^=ucfirst(api.name)$$ = function(req, res){
	var path = "^^=path$$/^^=api.path$$/" + req.params.id;
	if(fs.existsSync(path))
		res.send(fs.readFileSync(path).toString());
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
  Model.method.gets(criteria, cols, function(err, models) {
    if (err)
      res.send(err);
		else
			res.send(models);
  });
};
 ^^}else if(api.type == "post"){$$
exports.^^=api.name$$ = function(req, res) {
};
 ^^}else if(api.type == "get"){$$
exports.^^=api.name$$ = function(req, res) {
};

 ^^}else if(api.type == "put"){$$
exports.^^=api.name$$ = function(req, res) {
	if(!req.params.id){
		res.send({error: "no id"});
		return;
	}
	if(!Object.keys(req.body).length){
		res.send({error: "no postdata"});
		return;
	}

	^^if(!api.field){$$
	var doc = req.body;
	^^}else{$$
	var doc = {}
	 ^^for (var f in api.field){$$
	doc.^^=f$$ = req.body.^^=f$$;
	 ^^}$$
	^^}$$
  Model.method.put({ "^^=idField$$": req.params.id }, doc, function(err) {
    if (err)
      res.send({error: err});
		else
			res.json({success: true});
  });
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
