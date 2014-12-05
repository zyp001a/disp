// Load required packages
var Model = require('../models/^^=name$$');
^^apis.forEach(function(api){$$
 ^^if(api.type == "getList"){$$
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
      res.send(err);

    res.json({ message: 'removed!' });
  });
};
 ^^}$$
^^})$$


^^if(restful){$$
exports.post = function(req, res) {
  var json = {};
	^^fields.forEach(function(field){$$
	if(req.body.^^=field.name$$)
		json.^^=field.name$$ = req.body.^^=field.name$$;
	^^})$$
  var model = new Model(json);
  model.save(function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'insert successful' });
  });
};

exports.get = function(req, res) {
  // Use the Beer model to find a specific beer
  Model.findOne({ ^^=idField$$: req.params.id }, function(err, model) {
    if (err)
      res.send(err);
    res.json(model);
  });
};

// Create endpoint /api/beers/:beer_id for PUT
exports.put = function(req, res) {
  // Use the Beer model to find a specific beer
  var json = {};
	^^fields.forEach(function(field){$$
		^^if(field.name!="_id"){$$
	if(req.body.^^=field.name$$)
		json.^^=field.name$$ = req.body.^^=field.name$$;
		^^}$$
	^^})$$

  Model.update({ ^^=idField$$: req.params.id }, json, function(err, num, raw) {
		console.log(err);
    if (err)
      res.send(err);

    res.json({ message: num + ' updated' });
  });
};

// Create endpoint /api/beers/:beer_id for DELETE
exports.delete = function(req, res) {
  // Use the Beer model to find a specific beer and remove it
  Model.remove({ ^^=idField$$: req.params.id }, function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'removed!' });
  });
};
^^}$$