var fs=require("fs");
module.exports.get = function(req, res){
	var filename = __dirname+"/../../../^^=file$$";
^^if(file){$$
	res.json({file: encodeURIComponent(fs.readFileSync(filename))});
^^}else if(json){$$
	res.json(JSON.parse(fs.readFileSync(filename)));
^^}$$

}
module.exports.put = function(req, res){
	var filename = __dirname+"/../../../^^=file$$";
^^if(file){$$
	if(req.body.file){
		fs.writeFileSync(filename, decodeURIComponent(req.body.file));
		res.send("success");
	}else{
		res.send(503, "failed");
	}
^^}else if(json){$$
		fs.writeFileSync(filename+"~~", fs.readFileSync(filename));
		fs.writeFileSync(filename, req.body);
		res.send("success");
^^}else{$$

^^}$$
	
}
