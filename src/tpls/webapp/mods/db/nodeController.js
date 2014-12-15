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
  Model.find(function(err, models) {
    if (err)
      res.send(err);
		else
			res.json(models);
  });
};
 ^^}else if(api.type == "post"){$$
exports.^^=api.name$$ = function(req, res) {
  var json = {};
	^^fields.forEach(function(field){$$
	if(req.body.^^=field.name$$)
		json.^^=field.name$$ = req.body.^^=field.name$$;
	^^})$$
  var model = new Model(json);
  model.save(function(err) {
    if (err)
      res.send(err);
		else
			res.json({ message: 'insert successful' });
  });
};
 ^^}else if(api.type == "get"){$$
exports.^^=api.name$$ = function(req, res) {
  // Use the Beer model to find a specific beer
  Model.findOne({ ^^=idField$$: req.params.id }, function(err, model) {
    if (err)
      res.send(err);
		^^if(api.field){$$
		res.send(model.^^=api.field$$);
		^^}else{$$
    res.json(model);
		^^}$$
  });
};

 ^^}else if(api.type == "put"){$$
exports.^^=api.name$$ = function(req, res) {
  // Use the Beer model to find a specific beer
  var json = {};
	^^fields.forEach(function(field){$$
	if(req.body.^^=field.name$$)
		json.^^=field.name$$ = req.body.^^=field.name$$;
	^^})$$

  Model.update({ ^^=idField$$: req.params.id }, json, function(err, num, raw) {
    if (err)
      res.send(err);

    res.json({ message: num + ' updated' });
  });
};

 ^^}else if(api.type == "delete"){$$
exports.^^=api.name$$ = function(req, res) {
  // Use the Beer model to find a specific beer and remove it
  Model.remove({ ^^=usernameField$$: req.params.id }, function(err) {
    if (err)
      res.send({error: err});
		else
			res.json({ success: true });
  });
};
 ^^}$$
^^})$$


^^if(restful){$$
exports.post = function(req, res) {
	console.log("POST ^^=name$$");
	console.log(req.body);
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
  Model.method.put({ "^^=idField$$": req.params.id }, req.body, function(err) {
    if (err)
      res.send({error: err});
		else
			res.json({success: true});
  });
};

// Create endpoint for DELETE
exports.delete = function(req, res) {
  Model.method.delete({ "^^=idField$$": req.params.id }, function(err) {
    if (err)
      res.send({error: err});
		else
			res.json({success: true});
  });
};
^^}$$
