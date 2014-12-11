var assert = require('assert');
var fs = require('fs');
var utils = require("./utils");

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
		var json = {};
^^schema.fields.forEach(function(field){$$
 ^^if(field.required){$$
  ^^if(field.type == "String"){$$
		json.^^=field.name$$ = "test^^=field.name$$2";
  ^^}$$
 ^^}$$
^^})$$

    utils.postapi("/^^=name$$/^^=signup$$", json, function(err, doc){
			assert.equal(err, null);
			console.log(doc);
			assert.equal(doc.statusCode, 200);
			assert.equal("testphone2", doc.data.username);
      done();
    });
  });
});
