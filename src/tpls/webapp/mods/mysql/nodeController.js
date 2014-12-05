// Load required packages
var mysql = require('../dbconn').mysql;
^^apis.forEach(function(api){$$
 ^^if(api.type == "getList"){$$
exports.^^=api.name$$ = function(req, res) {
	mysql.query("SELECT * FROM ^^=name$$", function(err, models){
    if (err)
      res.send(err);
		else
			res.json(models);
  });
};
 ^^}else if(api.type == "post"){$$
exports.^^=api.name$$ = function(req, res) {
  mysql.query(mysql.getInsertStr(req.body, "^^=name$$"), function(err, models){
    if (err)
      res.send(err);
		else
			res.json({ message: 'insert successful' });
  });
}
 ^^}else if(api.type == "get"){$$
exports.^^=api.name$$ = function(req, res) {
	mysql.query("SELECT * FROM ^^=name$$ WHERE `^^=idField$$` = '" + req.params.id+ "'", function(err, models){
    if (err)
      res.send(err);
		else
			res.json(models[0]);
  });
}
 ^^}else if(api.type == "put"){$$
exports.^^=api.name$$ = function(req, res) {
}
 ^^}else if(api.type == "delete"){$$
exports.^^=api.name$$ = function(req, res) {
};
 ^^}$$
^^})$$


^^if(restful){$$
exports.post = function(req, res) {
  mysql.query(mysql.getInsertStr(req.body, "^^=name$$"), function(err, models){
    if (err)
      res.send(err);
		else
			res.json({ message: 'insert successful' });
  });
};

exports.get = function(req, res) {
	mysql.query("SELECT * FROM ^^=name$$ WHERE `^^=idField$$` = '" + req.params.id+ "'", function(err, models){
    if (err)
      res.send(err);
		else
			res.json(models[0]);
  });

};

exports.put = function(req, res) {
};

exports.delete = function(req, res) {
};
^^}$$
