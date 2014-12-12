var DB = require('../models/^^=db$$');
var utils = require('../utils');
module.exports.sendSMS = function(req, res){
	if(!req.body.phone)
		res.send({error: "no phone"});
	else{
		var json = ^^=JSON.stringify(params)$$;
		json.^^=phoneField$$ = req.body.phone;
		var code = utils.genNum(6);
		json.^^=codeField$$ = code;
		DB.findOne({"^^=schema.idField$$":req.body.phone}, function(err, doc){
			if(err){
        res.send({error: err, message: "findOne failed ^^=schema.idField$$: "+req.body.phone});
				return;
			}	
			console.log(doc);
			if(!doc){
				doc = new DB({
					"^^=schema.idField$$": req.body.phone,
					"^^=schema.codeField$$": code,
					"^^=schema.timeField$$": new Date()
				});
			}else if(new Date().getTime() - doc.^^=schema.timeField$$.getTime() < 60000){
				res.send({error: "wait 60s to send next"});
				return;
			}
			doc.^^=schema.codeField$$ = code;
			doc.^^=schema.timeField$$ = new Date();
			doc.save(function(err){
				if(err){
					res.send({error: err});
					return;
				}
				if(req.body.pseudo){
					console.log("send to "+req.body.phone);
					console.log(json);
					res.send({"success": true, "code": code});
				}else{
					console.log(json);
					utils.webreq.postForm("^^=url$$", json, function(err, result){
						console.log(err);
						if(err) res.send({error: err});
						else if(^^=success$$)
							res.send({"success": true});
						else
							res.send({"success": false, error: result});
					});
				}
			});
		});
	}
}
module.exports.verifySMS = function(req, res){
	DB.findOne({
		"^^=schema.idField$$":req.body.phone,
    "^^=schema.codeField$$":req.body.code
	}, function(err, doc){
		if(err)
			res.send({error: err});
		else if(doc)
			res.send({result: true});
		else
			res.send({result: false});
	})
}
