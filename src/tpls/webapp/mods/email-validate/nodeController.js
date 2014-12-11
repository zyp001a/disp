var DB = require('../models/^^=db$$');
var utils = require('../utils');

var nodemailer = require('nodemailer');
// create reusable transporter object using SMTP transport
var transporter = nodemailer.createTransport({
	host: "^^=host$$",
	port: ^^=port$$,
//	 secureConnection: true,
	auth: {
		user: "^^=user$$",
		pass: "^^=password$$"
	}
});

module.exports.sendEmail = function(req, res){
	var code = utils.hat();
	var url;
	if(process.env.NODE_ENV=="test"){
		url = "^^=test.serverURI$$/api/^^=name$$/verifyEmail?code=" + code;
	}else{
		url = "^^=serverURI$$/api/^^=name$$/verifyEmail?code=" + code;
	}
	DB.findOneAndUpdate({"^^=schema.idField$$":req.body.email}, {
		"^^=schema.idField$$": req.body.email,
		"^^=schema.codeField$$": code
	}, {upsert:true}, function(err, doc){
		var mailOptions = {
			from: '^^=username$$ <^^=user$$>', // sender address
			to: req.body.email, // list of receivers
			subject: '^^=subject$$', // Subject line
			text: '^^=textpre$$' + url + "^^=textafter$$" // plaintext body
//	html: ""
		};
		transporter.sendMail(mailOptions, function(err, info){
			if(err){
				res.status(401).send({"error": err});
			}else{
				res.send('Message sent: ' + info.response);
			}
		});
	});
}
module.exports.verifyEmail = function(req, res){
	DB.findOne({
    "^^=schema.codeField$$":req.params.code
	}, function(err, doc){
		if(err)
			res.status(401).send({error: err});
		else if(doc)
			res.send({result: true});
		else
			res.send({result: false});
	})
}
