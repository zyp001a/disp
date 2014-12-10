var http = require('http');
var https = require('https');
var querystring = require('querystring');
var url = require("url");
function postForm(urlStr, json, fn){
	var urlParsed = url.parse(urlStr);
	
	var content = querystring.stringify(json);
	var options = {
    host: urlParsed.host,
    path: urlParsed.path,
    method:'POST',
    agent:false,
    rejectUnauthorized : false,
    headers:{
      'Content-Type' : 'application/x-www-form-urlencoded', 
      'Content-Length' :content.length
    }
	};
	var req;
	if(urlParsed.protocol == "http:"){
		req = http.request(options,function(res){
			res.setEncoding('utf8');
			res.on('data', function (chunk) {
        fn(null, JSON.parse(chunk));
			});
			res.on('end',function(){
				//        console.log('over');
			});
		});
	}else if(urlParsed.protocol == "https:"){
		req = http.request(options,function(res){
			res.setEncoding('utf8');
			res.on('data', function (chunk) {
        fn(null, JSON.parse(chunk));
			});
			res.on('end',function(){
				//        console.log('over');
			});
		});
	}else{
		console.error("wrong protocol "+ urlParsed.protocol);
		process.exit(1);
	}
	req.write(content);
	req.end();
}
module.exports = {
	postForm: postForm
}

