var Db = require('../models/^^=db$$');
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

function _sendEmail(body, fn){
	if(!body.email){
		fn("no email");
		return;
	}
	
	Db.method.get({"^^=schema.idField$$": body.email}, {}, function(err, doc){
		if(err){ fn(err);	return;	}	
		var code = utils.hat();	
		if(!doc){
			doc = new Db({
				"^^=schema.idField$$": body.email,
				"^^=schema.codeField$$": code,
				"^^=schema.timeField$$": new Date()
			});
		}else if(new Date().getTime() - doc.^^=schema.timeField$$.getTime() < 60000){
			fn("邮件已发送，请等待60s后再发");
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
			var url;
			if(process.env.NODE_ENV=="test"){
				url = "^^=test.serverURI$$";
			}else{
				url = "^^=serverURI$$";
			}
			url += "/api/^^=name$$/verifyEmail?email=" + body.email + "&code=" + code;
			var mailOptions = {
				from: '^^=username$$ <^^=user$$>', // sender address
				to: body.email, // list of receivers
				subject: '^^=subject$$', // Subject line
				text: '^^=textpre$$' +  url + "^^=textafter$$" // plaintext body
				//	html: ""
			};
			console.log(mailOptions);
			transporter.sendMail(mailOptions, function(err, info){
				if(err){ fn(err); return;}
				fn(null, info.response);
			});

		});
	});

}

module.exports.sendEmail = function(req, res){
	
	_sendEmail(req.body, function(err, result){
		if(err){res.send({error:err}); return;}
		res.send({success:true,result:result});
	});
}
module.exports.verifyEmail = function(req, res){
	Db.method.VerifyCode({
		"id":req.param("email"),
    "code":req.param("code"),
		"minutes": 3
	}, function(err, doc){
		if(err){res.send({error: err}); return;}
		if(doc)
			res.send({result: true});
		else
			res.send({result: false});
	});
}
