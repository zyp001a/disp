var fs = require("fs");
function _default(mod, mp, env){
	mp.content = fs.readFileSync(mod+"/content");
	return 1;
}
module.exports._default = _default;
