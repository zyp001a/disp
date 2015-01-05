var utils = require('../utils');
var path = require('path');
var fs = require("fs");

exports.download = function(req, res){
  var fpath = path.resolve(__dirname + "/../../^^=name$$/" + req.params.filename);
  console.log(fpath);
  if(fs.existsSync(fpath)){
    res.send(fs.readFileSync(fpath));
  }
  else
    res.status(500).send({error: "not exist"});
}
exports.hasUpdate = function(req, res){
	if(req.body.version < ^^=version$$){
		res.send({hasUpdate: 1, file: "^^=file$$"});
	}else{
		res.send({hasUpdate: 0});
	}
}
