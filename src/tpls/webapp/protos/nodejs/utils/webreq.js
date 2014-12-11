var http = require('http');
var https = require('https');
var querystring = require('querystring');
var url = require("url");

function post(protocol, options, content, fn){
	var req;
	if(protocol == "http:"){
		var data = "";
		req = http.request(options,function(res){
			res.setEncoding('utf8');
			res.on('data', function (chunk) {
				data += chunk;
			});
			res.on('error', function (e) {
        fn(e, {statusCode: res.statusCode});
			});			
			res.on('end',function(){
				var doc = {};
				doc.statusCode = res.statusCode;
				try {
					doc.data = JSON.parse(data);
				}catch(e){
					doc.data = data;
				}
        fn(null, doc);
				//        console.log('over');
			});
		});
	}else if(protocol == "https:"){
		req = https.request(options,function(res){
			res.setEncoding('utf8');
			res.on('data', function (chunk) {
        fn(res.status, JSON.parse(chunk));
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
function postForm(urlStr, json, fn){
	var urlParsed = url.parse(urlStr);	
	var content = querystring.stringify(json);
	console.log(urlParsed);
	var options = {
    host: urlParsed.hostname,
    path: urlParsed.path,
    method: 'POST',
    agent: false,
    rejectUnauthorized : false,
    headers: {
      'Content-Type' : 'application/x-www-form-urlencoded', 
      'Content-Length' :content.length
    }
	};
	if(urlParsed.port) options.port = urlParsed.port;
	post(urlParsed.protocol, options, content, fn);
}
function postJSON(urlStr, json, fn){
	var urlParsed = url.parse(urlStr);	
	var content = JSON.stringify(json);
	var options = {
    host: urlParsed.hostname,
    path: urlParsed.path,
    method: 'POST',
    agent: false,
    rejectUnauthorized : false,
    headers: {
      'Content-Type' : 'application/json', 
      'Content-Length' :content.length
    }
	};
	if(urlParsed.port) options.port = urlParsed.port;
	post(urlParsed.protocol, options, content, fn);
}
module.exports = {
	postForm: postForm,
	postJSON: postJSON
}

