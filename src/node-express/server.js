var express = require('express');
var fs=require('fs');
var app = express();

var path = require('path'),
    http = require('http');

^^[1,2,3].forEach(function(a){$$
console.log(^^=a$$);
^^})$$;

app.configure(function(){
  app.set('port',^^=port$$);
  app.use(express.logger('dev'));  /* 'default', 'short', 'tiny', 'dev' */
  app.use(express.bodyParser({limit: '500mb'}));
//    app.use(express.static(path.join(__dirname, 'public')));
});


http.createServer(app).listen(app.get('port'), function () {	
  console.log("Express server listening on port " + app.get('port'));
	fs.writeFile("PID",process.pid);
});

