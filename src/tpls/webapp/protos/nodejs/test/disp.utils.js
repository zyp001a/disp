var webreq = require("../utils").webreq;
var server;
console.log("NODE_ENV = " + process.env.NODE_ENV );
if(process.env.NODE_ENV == "test"){
	server = "^^=test.serverURI$$";
}else{
	server = "^^=serverURI$$";
}
function postapi(path, json, fn){
	webreq.postJSON(server + "/api" + path, json, fn);
}
function postapiAuth(path, json, fn){
	if(!path.match("\\?"))
		path += "?access_token=testtoken";
	else
		path += "&access_token=testtoken";
	postapi(path, json, fn);
}
function putapi(path, json, fn){
	webreq.putJSON(server + "/api" + path, json, fn);
}
function putapiAuth(path, json, fn){
	if(!path.match("\\?"))
		path += "?access_token=testtoken";
	else
		path += "&access_token=testtoken";
	putapi(path, json, fn);
}
function getapi(path, fn){
	webreq.get(server + "/api" + path, fn);
}
function getapiAuth(path, fn){
	if(!path.match("\\?"))
		path += "?access_token=testtoken";
	else
		path += "&access_token=testtoken";
	getapi(path, fn);
}
function deleteapi(path, fn){
	webreq.delete(server+"/api" + path, fn);
}
function deleteapiAuth(path, fn){
	if(!path.match("\\?"))
		path += "?access_token=testtoken";
	else
		path += "&access_token=testtoken";
	deleteapi(path, fn);
}
module.exports = {
	postapi: postapi,
	postapiAuth: postapiAuth,
	putapi: putapi,
	putapiAuth: putapiAuth,
	deleteapi: deleteapi,
	deleteapiAuth: deleteapiAuth,
	getapi: getapi,
	getapiAuth: getapiAuth
}
