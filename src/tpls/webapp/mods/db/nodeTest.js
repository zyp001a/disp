var assert = require('assert');
var fs = require('fs');
var utils = require("./utils");
var Model = require("../models/^^=name$$");

describe('^^=name$$Test', function() {
	before(function(){
  });
^^apis.forEach(function(api){$$
 ^^if(api.type == "gets"){$$
  it('should successful ^^=api.type$$ ^^=api.name$$', function(done) {
		utils.getapiAuth("/^^=api.name$$", function(err, doc){
			assert.equal(err, null);
			console.log(doc.data);
			assert.equal(200, doc.statusCode);
			assert.equal(undefined, doc.data.error);
			assert.equal(true, doc.data.length > 0);
			^^if(api.criteria){$$
				^^if(api.criteria.limit){$$
			assert.equal(true, ^^=api.criteria.limit$$ > doc.data.length);
				^^}$$
			^^}$$
			done();
		});
	})
 ^^}else if(api.type == "post"){$$

 ^^}else if(api.type == "put"){$$

  it('should successful ^^=api.type$$ ^^=api.name$$', function(done) {
		^^if(fields[0].default == "autoinc"){$$
		var id = 1;
		^^}else{$$
		var id = "test^^=idField$$";
		^^}$$
		
		var json = {};
		^^fields.forEach(function(field){if(!field.auto){$$
		^^if(!api.field || api.field[field.name]){$$
		json.^^=field.name$$ = ^^=dbdef.getType(field, "jstest", "test")$$;
		^^}}})$$
		var json2 = {};
		^^fields.forEach(function(field){if(!field.auto){$$
		^^if(!api.field || api.field[field.name]){$$
		json2.^^=field.name$$ = ^^=dbdef.getType(field, "jstest", "test2")$$;
		^^}}})$$
		^^if(tokenField){$$
		delete json.^^=tokenField$$;
		delete json2.^^=tokenField$$;
		^^}$$

		utils.putapiAuth("/^^=api.name$$/" + id, json2, function(err, doc){
			assert.equal(err, null);
			console.log(doc.data);
			assert.equal(200, doc.statusCode);
			assert.equal(undefined, doc.data.error);
			assert.equal(true, doc.data.success);
			utils.putapiAuth("/^^=api.name$$/" + id, json, function(err, doc){
				assert.equal(err, null);
				console.log(doc.data);
				assert.equal(200, doc.statusCode);
				assert.equal(undefined, doc.data.error);
				assert.equal(true, doc.data.success);
				done();
			});
		});		
	});

 ^^}$$
^^})$$

^^if(restful){$$
  it('should successful get', function(done) {
		^^if(fields[0].default == "autoinc"){$$
		var id = 1;
		^^}else{$$
		var id = "test^^=idField$$";
		^^}$$

    utils.getapiAuth("/^^=name$$/" + id, function(err, doc){
			assert.equal(err, null);
			console.log(doc.data);
			assert.equal(200, doc.statusCode);
			assert.equal(undefined, doc.data.error);
      done();
    });
  });

  it('should successful post, put and delete', function(done) {
		^^if(dbdef.getType(fields[1], "basic") == "string"){$$
		var mod = "test0^^=fields[1].name$$";
		^^}else{$$
		var mod = 2;
		^^}$$

		var json = {};
		^^fields.forEach(function(field){if(!field.default){$$
		json.^^=field.name$$ = ^^=dbdef.getType(field, "jstest", "test2")$$;
		^^}})$$
    utils.postapiAuth("/^^=name$$/", json, function(err, doc){
			assert.equal(err, null);
			console.log(doc.data);
			assert.equal(200, doc.statusCode);
			assert.equal(undefined, doc.data.error);
			assert.equal(true, doc.data.success);
			assert.notEqual(undefined, doc.data.insertId);
			var id = doc.data.insertId;
			utils.putapiAuth("/^^=name$$/" + id, {
				"^^=fields[1].name$$": mod
			}, function(err, doc){
				assert.equal(err, null);
				console.log(doc.data);
				assert.equal(200, doc.statusCode);
				assert.equal(undefined, doc.data.error);
				assert.equal(true, doc.data.success);
				utils.deleteapiAuth("/^^=name$$/" + id, function(err, doc){
					assert.equal(err, null);
					console.log(doc.data);
					assert.equal(200, doc.statusCode);
					assert.equal(undefined, doc.data.error);
					assert.equal(true, doc.data.success);
					done();
				});
			});
    });
  });
^^}$$
});
