var express = require('express');
global.app = express();

var path = require('path'),
    http = require('http');


app.configure(function () {
  app.set('port', process.env.PORT || 8088);
  app.use(express.logger('dev'));  /* 'default', 'short', 'tiny', 'dev' */
  app.use(express.bodyParser({limit: '500mb'}));
  app.use(express.static(path.join(__dirname, '../client')));
});
var listDir = require("./fsapi").listDir;
var getFile = require("./fsapi").getFile;

app.get('/file/:id', function(req, res){
  var id = req.params.id;
  var root= getFile(decodeURIComponent(id));
  res.send(root);
});

app.get('/dir', function(req, res){
	var root= listDir(".");
  res.send(root);
});
app.get('/dir/:id', function(req, res){
	var id = req.params.id;
	var root= listDir(decodeURIComponent(id));
	res.send(root);
});

http.createServer(app).listen(app.get('port'), function () {
  console.log("Express server listening on port " + app.get('port'));
});

