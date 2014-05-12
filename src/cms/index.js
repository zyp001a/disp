var json = 
{
	deps: {
		"node-express": "cms-server",
		"angular": "angular"
	},
	files: ["cms.html", "cms.js"],
	port: 8088,
	httpRoot: "../angular"
};
json.rels = [{
	with: "cms-server",
	pass: ["port", "httpRoot"]
}];

module.exports = json;

