var webreq = require("./webreq");
var encrypt = require("./encrypt");
var encoding = require("./encoding");
function formatDate(date, fmt){
	//author: meizz   
	var o = {   
    "M+" : date.getMonth()+1,                 //月份   
    "d+" : date.getDate(),                    //日   
    "h+" : date.getHours(),                   //小时   
    "m+" : date.getMinutes(),                 //分   
    "s+" : date.getSeconds(),                 //秒   
    "q+" : Math.floor((date.getMonth()+3)/3), //季度   
    "S"  : date.getMilliseconds()             //毫秒   
  };   
  if(/(y+)/.test(fmt))   
    fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));   
  for(var k in o)   
    if(new RegExp("("+ k +")").test(fmt))   
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
	console.log(fmt);
  return fmt;   
}
function hat(bits, base) {                                               
  if (!base) base = 16;                                                        
  if (bits === undefined) bits = 128;
  if (bits <= 0) return '0';
  var digits = Math.log(Math.pow(2, bits)) / Math.log(base);
  for (var i = 2; digits === Infinity; i *= 2) {
    digits = Math.log(Math.pow(2, bits / i)) / Math.log(base) * i;
  }  
	var rem = digits - Math.floor(digits);
	var res = '';
  for (var i = 0; i < Math.floor(digits); i++) {
    var x = Math.floor(Math.random() * base).toString(base);
    res = x + res;
  }
  if (rem) {
    var b = Math.pow(base, rem);
    var x = Math.floor(Math.random() * b).toString(base);
    res = x + res;
  }
  var parsed = parseInt(res, base);
  if (parsed !== Infinity && parsed >= Math.pow(2, bits)) {
    return hat(bits, base)
  }
  else return res;
}

function genNum(len){
	var str = "";
	for(var i=0; i<len; i++){
		str += Math.floor(Math.random()*10).toString();
	}
	return str;
}

function escapeRegExp(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}
function ucfirst(str) {
  //  discuss at: http://phpjs.org/functions/lcfirst/
  // original by: Brett Zamir (http://brett-zamir.me)
	str += '';
	var f = str.charAt(0)
				.toUpperCase();
	return f + str.substr(1);
};


function tmpl(str, data){
	data.ucfirst = ucfirst;
	var p=[];
	var win, wout;
	var evalstr = "p.push('";
	with(data){
		str = str.replace(/\r/g,"");
		str = str.
			replace(/[^\S\n]*(\^\^[^=]((?!\$\$).)*\$\$)\s*\n/g, "$1");
		//[\s but not \n]* [^^] [not =] [not $$]* [$$] [\s*\n] 
		str.split("\^\^").forEach(function(sub, i){
			if(i==0){
				win = "";
				wout = sub || "";
			}else{
				var subs = sub.split("\$\$");
				win = subs[0];
				wout = subs[1] || "";
			}
			wout = wout.replace(/\\([nrt'])/g, "\\\\$1")
				.replace(/\n/g, "\\n")
				.replace(/'/g, "\\'")
				.replace(/\\\"/g, "\\\\\\\"");

			if(win && win[0] == '='){
				evalstr += (win.replace(/^=(.+)/, "',$1,'") + wout);
			}
			else{

				evalstr+=("');"+win+";p.push('"+wout);
			}
			
		});
		evalstr+="');";
		eval(evalstr);
		return p.join('');
	}
}
function isArray(obj){
	return Object.prototype.toString.call( obj ) === '[object Array]';
}
function tplMatch(obj, str){
	var match = false;
	if(isArray(obj))
		obj.forEach(function(o){
			if(o==str)
				match = true;
		});
	else
		match = (obj == str);
	return match;
}
function readJSON(file){
	if(fs.existsSync(file)){
		return JSON.parse(fs.readFileSync(file));
	}
	else{
		console.error("No JSON file:" + file);
		process.exit(1);
	}
}
function readJSONUnsafe(file){
	if(fs.existsSync(file)){
		return JSON.parse(fs.readFileSync(file));
	}
	else{
		return {};
	}
}



module.exports = {
	webreq: webreq,
	encrypt: encrypt,
	encoding: encoding,
	hat: hat,
	genNum: genNum,
	escapeRegExp: escapeRegExp,
	ucfirst: ucfirst,
	tmpl: tmpl,
	isArray: isArray,
	formatDate: formatDate,
	readJSON: readJSON,
	readJSONUnsafe: readJSONUnsafe
};
