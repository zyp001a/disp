var webreq = require("../utils").webreq;
function postapi(path, json, fn){
	webreq.postJSON("^^=test.serverURI$$/api" + path, json, fn);
}
function getapi(path, fn){
}
function postapiAuth(path, json, fn){
	path += "?access_token=testtoken";
	webreq.postJSON("^^=test.serverURI$$/api" + path, json, fn);
}
function getapiAuth(path, fn){
	path += "?access_token=testtoken";
}
module.exports = {
	postapi: postapi,
	getapi: getapi,
	postapiAuth: postapiAuth,
	getapiAuth: getapiAuth
}
