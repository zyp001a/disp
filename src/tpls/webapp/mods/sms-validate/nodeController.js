var Db = require('../models/^^=db$$');
^^if(userDb){$$
var userDb = require('../models/^^=userDb$$');
^^}$$
var utils = require('../utils');

function _sendSMS(body, fn){
	var json = ^^=JSON.stringify(params)$$;
	json.^^=phoneField$$ = body.phone;

	var code = utils.genNum(6);
	json.^^=codeField$$ = code;

	Db.findOne({"^^=schema.idField$$": body.phone}, function(err, doc){
		if(err){
			fn(err);
			return;
		}	
		if(!doc){
			doc = new Db({
				"^^=schema.idField$$": body.phone,
				"^^=schema.codeField$$": code,
				"^^=schema.timeField$$": new Date()
			});
		}else if(new Date().getTime() - doc.^^=schema.timeField$$.getTime() < 60000){
			fn("wait 60s to send next");
			return;
		}
		doc.^^=schema.codeField$$ = code;
		doc.^^=schema.timeField$$ = new Date();
		console.log(doc);
		doc.save(function(err){
			if(err){
				fn(err);
				return;
			}
			if(body.pseudo){
				console.log("send to "+body.phone);
				console.log(json);
				fn(null, {"success": true, "code": code});
			}else{
				console.log(json);
				utils.webreq.postForm("^^=url$$", json, function(err, result){
					if(err) fn(err);
					else if(^^=success$$)
						fn(null, {"success": true});
					else
						fn(null, {"success": false, error: result});
				});
			}
		});
	});

}
module.exports.sendSMS = function(req, res){
	if(!req.body.phone)
		res.send({error: "no phone"});
	else{
		_sendSMS(req.body, function(err, result){
			if(err) res.send({error: err});
			else res.send(result);
		});
	}
}
^^if(userDb){$$
module.exports.sendSMSSignup = function(req, res){
	if(!req.body.phone)
		res.send({error: "no phone"});
	else{
		userDb.findOne({"^^=userDbPhoneField$$":req.body.phone}, function(err, doc){
			if(err){
				res.send({error: err, message: "database error: findOne failed: "+req.body.phone});
				return;
			}
			if(doc){
				res.send({errorCode:1, error: "phone already exists"});
				return;
			}
			_sendSMS(req.body, function(err, result){
				if(err) res.send({error: err});
				else res.send(result);
			});
		});

	}

}
^^}$$
module.exports.verifySMS = function(req, res){
	Db.findOne({
		"^^=schema.idField$$":req.body.phone,
    "^^=schema.codeField$$":req.body.code
	}, function(err, doc){
		if(err)
			res.send({error: err});
		else if(doc)
			res.send({result: true});
		else
			res.send({result: false});
	});
}
