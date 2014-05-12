var express = require('express');
var fs=require('fs');
var app = express();

var path = require('path'),
    http = require('http');


app.configure(function(){
  app.set('port',^^=port$$);
  app.use(express.logger('dev'));  /* 'default', 'short', 'tiny', 'dev' */
  app.use(express.bodyParser({limit: '500mb'}));
^^if(httpRoot)$$
  app.use(express.static(path.join(__dirname, "^^=httpRoot$$")));
});


http.createServer(app).listen(app.get('port'), function () {	
  console.log("Express server listening on\n\r\' port " + app.get('port'));
	fs.writeFile("PID",process.pid);
});

