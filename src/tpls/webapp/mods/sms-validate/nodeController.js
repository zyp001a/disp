var DB = require('../models/^^=db$$');
var utils = require('../utils');
module.exports.sendSMS = function(req, res){
	if(!req.body.phone)
		res.status(401).send({error: "no phone"});
	else{
		var json = ^^=JSON.stringify(params)$$;
		json.^^=phoneField$$ = req.body.phone;
		var code = utils.genNum(6);
		DB.findOneAndUpdate({"^^=schema.idField$$":req.body.phone}, {
			"^^=schema.idField$$":req.body.phone,
			"^^=schema.codeField$$":code
		}, {upsert:true}, function(err, doc){
			if(err){
				res.status(401).send({error: err});
			}else if(new Date().getTime() - doc.^^=schema.timeField$$.getTime() < 60000){
				res.status(401).send({error: "wait 60s to send next"});
			}else{
				json.^^=codeField$$ = code;
				if(req.body.pseudo){
					console.log("send to "+req.body.phone);
					res.send({"success": true});
				}else{
					utils.webreq.postForm("^^=url$$", json, function(err, result){
						if(err) res.status(401).send({error: err});
					else if(^^=success$$)
						res.send({"success": true});
					else
						res.status(401).send({error: json});
					});
				}
			}
		});
	}
}
module.exports.verifySMS = function(req, res){
	DB.findOne({
		"^^=schema.idField$$":req.body.phone,
    "^^=schema.codeField$$":req.body.code
	}, function(err, doc){
		if(err)
			res.status(401).send({error: err});
		else if(doc)
			res.send({result: true});
		else
			res.send({result: false});
	})
}
