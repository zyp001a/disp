// Load required packages
var Model = require('../models/^^=name$$');


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


exports.getList = function(req, res) {
  Model.find(function(err, models) {
    if (err)
      res.send(err);

    res.json(models);
  });
};


exports.get = function(req, res) {
  // Use the Beer model to find a specific beer
  Model.find({ _id: req.params._id }, function(err, model) {
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
	if(req.body.^^=field.name$$)
		json.^^=field.name$$ = req.body.^^=field.name$$;
	^^})$$

  Model.update({ _id: req.params._id }, json, function(err, num, raw) {
    if (err)
      res.send(err);

    res.json({ message: num + ' updated' });
  });
};

// Create endpoint /api/beers/:beer_id for DELETE
exports.delete = function(req, res) {
  // Use the Beer model to find a specific beer and remove it
  Model.remove({ _id: req.params._id }, function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'removed!' });
  });
};
