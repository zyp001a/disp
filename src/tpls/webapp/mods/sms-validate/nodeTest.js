var assert = require('assert');
var fs = require('fs');
var utils = require("./utils");

describe('^^=name$$Test', function() {
	before(function(){
  });
  it('should successful send SMS and verify SMS', function(done) {
    utils.postapi("/^^=name$$/sendSMS", {
      phone: "123456",
			pseudo: true
    }, function(err, doc){
			assert.equal(err, null);
			console.log(doc);
			assert.equal(doc.statusCode, 200);
			assert.equal(doc.data.success, true);
			utils.postapi("/^^=name$$/verifySMS", {
				phone: "123456",
				code: doc.data.code
			}, function(err, doc){
				assert.equal(err, null);
				console.log(doc);
				assert.equal(doc.statusCode, 200);
				assert.equal(true, doc.data.result);
				done();
			});			
    });
  });
});
