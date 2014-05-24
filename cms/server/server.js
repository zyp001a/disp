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
var dirTree = require("./dirTree").dirTree;

app.get('/dir', function(req, res){
	var id = req.params.id;
	if(!id) id = ".";
	var root= dirTree(encodeURIComponent(id));
	root.type = "root";
	res.send(root);
});


http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});

