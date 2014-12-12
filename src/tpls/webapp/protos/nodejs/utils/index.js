var webreq = require("./webreq");
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

/**
*
*  Base64 encode / decode
*  http://www.webtoolkit.info/
*
**/
var base64 = {
  // private property
  _keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
  // public method for encoding
  encode : function (input) {
    var output = "";
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    var i = 0;
    input = Base64._utf8_encode(input);
    while (i < input.length) {
      chr1 = input.charCodeAt(i++);
      chr2 = input.charCodeAt(i++);
      chr3 = input.charCodeAt(i++);
      enc1 = chr1 >> 2;
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
      enc4 = chr3 & 63;
      if (isNaN(chr2)) {
        enc3 = enc4 = 64;
      } else if (isNaN(chr3)) {
        enc4 = 64;
      }
      output = output +
        this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
        this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
    }
    return output;
  },
  // public method for decoding
  decode : function (input) {
    var output = "";
    var chr1, chr2, chr3;
    var enc1, enc2, enc3, enc4;
    var i = 0;
    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
    while (i < input.length) {
      enc1 = this._keyStr.indexOf(input.charAt(i++));
      enc2 = this._keyStr.indexOf(input.charAt(i++));
      enc3 = this._keyStr.indexOf(input.charAt(i++));
      enc4 = this._keyStr.indexOf(input.charAt(i++));
      chr1 = (enc1 << 2) | (enc2 >> 4);
      chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
      chr3 = ((enc3 & 3) << 6) | enc4;
      output = output + String.fromCharCode(chr1);
      if (enc3 != 64) {
        output = output + String.fromCharCode(chr2);
      }
      if (enc4 != 64) {
        output = output + String.fromCharCode(chr3);
      }
    }
    output = Base64._utf8_decode(output);
    return output;
  },
  // private method for UTF-8 encoding
  _utf8_encode : function (string) {
    string = string.replace(/\r\n/g,"\n");
    var utftext = "";
    for (var n = 0; n < string.length; n++) {
      var c = string.charCodeAt(n);
      if (c < 128) {
        utftext += String.fromCharCode(c);
      }
      else if((c > 127) && (c < 2048)) {
        utftext += String.fromCharCode((c >> 6) | 192);
        utftext += String.fromCharCode((c & 63) | 128);
      }
      else {
        utftext += String.fromCharCode((c >> 12) | 224);
        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
        utftext += String.fromCharCode((c & 63) | 128);
      }
    }
    return utftext;
  },
  // private method for UTF-8 decoding
  _utf8_decode : function (utftext) {
    var string = "";
    var i = 0;
    var c = c1 = c2 = 0;
    while ( i < utftext.length ) {
      c = utftext.charCodeAt(i);
      if (c < 128) {
        string += String.fromCharCode(c);
        i++;
      }
      else if((c > 191) && (c < 224)) {
        c2 = utftext.charCodeAt(i+1);
        string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
        i += 2;
      }
      else {
        c2 = utftext.charCodeAt(i+1);
        c3 = utftext.charCodeAt(i+2);
        string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
        i += 3;
      }
    }
    return string;
  }
}

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
	hat: hat,
	genNum: genNum,
	base64: base64,
	webreq: webreq,
	escapeRegExp: escapeRegExp,
	ucfirst: ucfirst,
	tmpl: tmpl,
	isArray: isArray,
	readJSON: readJSON,
	readJSONUnsafe: readJSONUnsafe
};
