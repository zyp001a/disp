function tmpl(str, data){
	with(data){
		var p=[];
		var evalstr = "p.push('"+
		str
			.replace(/\n/g, "\\n")
			.replace(/\^\^=(.*?)\$\$/g, "',$1,'")
			.replace(/\s*(\^\^.*?\$\$)\s*\\n/g, "$1")
			.split("\^\^").join("');")
			.split("\$\$").join(";p.push('")
			+ "');";
//		console.log(evalstr);
		eval(evalstr);
//		console.log(p);
		return p.join('');
	}
}

module.exports.tmpl = tmpl;


