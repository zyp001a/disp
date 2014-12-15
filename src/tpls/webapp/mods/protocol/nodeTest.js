var assert = require('assert');
var fs = require('fs');
var utils = require("./utils");


describe('^^=name$$Test', function() {
	before(function(){
  });
^^if(restful){$$
  it('should successful get', function(done) {
		^^if(fields[0].default == "autoinc"){$$
		var id = "1";
		^^}else{$$
		var id = "test^^=idField$$";
		^^}$$

    utils.getapiAuth("/^^=name$$/" + id, function(err, doc){
			assert.equal(err, null);
			console.log(doc);
			assert.equal(200, doc.statusCode);
			assert.equal(undefined, doc.data.error);
      done();
    });
  });
  it('should successful post and delete', function(done) {
		var json = {};
		^^fields.forEach(function(field){if(!field.default){$$
		json.^^=field.name$$ = ^^=dbdef.getType(field, "jstest", "test2")$$;
		^^}})$$
    utils.postapiAuth("/^^=name$$/", json, function(err, doc){
			assert.equal(err, null);
			console.log(doc);
			assert.equal(200, doc.statusCode);
			assert.equal(undefined, doc.data.error);
			assert.equal(true, doc.data.success);
			assert.notEqual(undefined, doc.data.id);
			utils.deleteapiAuth("/^^=name$$/" + doc.data.id, function(err, doc){
				assert.equal(err, null);
				console.log(doc);
				assert.equal(200, doc.statusCode);
				assert.equal(undefined, doc.data.error);
				done();
			});
    });
  });
^^}$$
});
