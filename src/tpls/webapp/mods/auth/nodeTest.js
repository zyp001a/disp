var assert = require('assert');
var fs = require('fs');
var utils = require("./utils");
^^if(codeDb){$$
require("../dbconn");
^^}$$





describe('^^=name$$Test', function() {
	before(function(){
  });
  it('should successful signin', function(done) {
    utils.postapi("/^^=name$$/^^=signin$$", {
      password: "test^^=schema.passwordField$$",
      username: "test^^=schema.usernameField$$"
    }, function(err, doc){
			assert.equal(err, null);
			console.log(doc);
			assert.equal(doc.statusCode, 200);
			assert.equal("test^^=schema.usernameField$$", doc.data.username);
			assert.equal("test^^=schema.tokenField$$", doc.data.token);
      done();
    });
  });
  it('should successful signup', function(done) {
		var json = {};
^^if(codeDb){$$
		var Model = require("../models/^^=codeDb$$");
		var model = new Model({
			"^^=schema1.idField$$": "test^^=schema.usernameField$$2",
			"^^=schema1.codeField$$": "testcode2"
		});
		model.save(function(err){
			json.code="testcode2";
^^}$$
			json.username = "test^^=schema.usernameField$$2";
			json.password = "test^^=schema.passwordField$$2";


			utils.postapi("/^^=name$$/^^=signup$$", json, function(err, doc){
				assert.equal(err, null);
				console.log(doc);
				assert.equal(doc.statusCode, 200);
				assert.equal("testphone2", doc.data.username);
				done();
			});
		});
^^if(codeDb){$$
	});
^^}$$
});
