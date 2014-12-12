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
      password: "testpassword",
      username: "testphone"
    }, function(err, doc){
			assert.equal(err, null);
			console.log(doc);
			assert.equal(doc.statusCode, 200);
			assert.equal("testphone", doc.data.username);
			assert.equal("testtoken", doc.data.token);
      done();
    });
  });
  it('should successful signup', function(done) {

^^if(codeDb){$$
		var Model = require("../models/^^=codeDb$$");
		var model = new Model({
			"^^=schema1.idField$$": "test^^=schema.usernameField$$2",
			"^^=schema1.codeField$$": "testcode2"
		});
		model.save(function(err){
^^}$$

			var json = {};
			json.username = "test^^=schema.usernameField$$2";
			json.password = "test^^=schema.passwordField$$2";
			json.code="testcode2";

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
