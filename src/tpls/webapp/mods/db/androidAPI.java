^^function prequery(method, apiname){$$
 ^^if(method == "gets"){$$

  ^^if(!auth){$$
			HttpResult wr = HttpUtils.get(serverURI + "/api/^^=apiname$$/");
  ^^}else{$$
			HttpResult wr = HttpUtils.getBearer(serverURI + "/api/^^=apiname$$/", ^^=ucfirst(auth)$$Utils.getToken(context));
  ^^}$$

 ^^}else if(method == "get"){$$

  ^^if(!auth){$$
			HttpResult wr = HttpUtils.get(serverURI + "/api/^^=apiname$$/" + id);
  ^^}else{$$
			HttpResult wr = HttpUtils.getBearer(serverURI + "/api/^^=apiname$$/" + id, ^^=ucfirst(auth)$$Utils.getToken(context));
  ^^}$$

 ^^}else if(method == "put"){$$
			
			^^if(!auth){$$
			HttpResult wr = HttpUtils.putJSON(serverURI + "/api/^^=apiname$$/"+id, jo);
			^^}else{$$
			HttpResult wr = HttpUtils.putJSONBearer(serverURI + "/api/^^=apiname$$/"+id, jo, ^^=ucfirst(auth)$$Utils.getToken(context));
			^^}$$


 ^^}else if(method == "post"){$$			
			^^if(!auth){$$
			HttpResult wr = HttpUtils.postJSON(serverURI + "/api/^^=apiname$$/", jo);
			^^}else{$$
			HttpResult wr = HttpUtils.postJSONBearer(serverURI + "/api/^^=apiname$$/", jo, ^^=ucfirst(auth)$$Utils.getToken(context));
			^^}$$

 ^^}else if(method == "postImage"){$$
	^^if(!auth){$$
			HttpResult wr = HttpUtils.postBitmap(serverURI + "/api/^^=apiname$$/" + id, "a.jpg", bitmap);
	^^}else{$$
			HttpResult wr = HttpUtils.postBitmapBearer(serverURI + "/api/^^=apiname$$/" + id, "a.jpg", bitmap, ^^=ucfirst(auth)$$Utils.getToken(context));
	^^}$$

 ^^}else if(method == "postFile"){$$
	^^if(!auth){$$
			HttpResult wr = HttpUtils.postFile(serverURI + "/api/^^=apiname$$/" + id, path);
	^^}else{$$
			HttpResult wr = HttpUtils.postFileBearer(serverURI + "/api/^^=apiname$$/"+ id, path, ^^=ucfirst(auth)$$Utils.getToken(context));
	^^}$$


 ^^}else if(method == "delete"){$$
			^^if(!auth){$$
			HttpResult wr = HttpUtils.delete(serverURI + "/api/^^=apiname$$/"+id);
			^^}else{$$
			HttpResult wr = HttpUtils.deleteBearer(serverURI + "/api/^^=apiname$$/"+id, ^^=ucfirst(auth)$$Utils.getToken(context));
			^^}$$

 ^^}else{$$
	
 ^^}$$
			if (wr.statusCode == 200)
				if(wr.response.has("error")){
					if(wr.response.has("errorCode")){
						return new ExceptionCode(wr.response.getInt("errorCode"), wr.response.getString("error"));
					}else{
						return new ExceptionCode(10, wr.value);
					}
				}
				else{
^^}$$
^^function postquery(){$$
				}
			else if(wr.statusCode == 401)
				return new ExceptionCode(11, wr.value);
			else
				return new ExceptionCode(12, wr.value);
		} catch (SocketTimeoutException e) {
			return new ExceptionCode(102,e);
		} catch (ConnectException e) {
			return new ExceptionCode(101, e);
		} catch (IOException e) {
			return new ExceptionCode(100,e);
		} catch (Exception e) {
			return new ExceptionCode(e);
^^}$$


^^apis.forEach(function(api){$$
	^^if(!api.notAndroid){$$
			^^if(api.type == "gets"){$$
	public static ExceptionCode ^^=api.name$$(Context context) {
		try{
 ^^prequery("gets", api.name);$$
  ^^if(androidProvider){$$
							^^=ucfirst(name)$$Utils.saveList(^^=ucfirst(name)$$.getList(wr.responses), context);
							return ExceptionCode.NullException;
  ^^}else{$$
							return ExceptionCode.withResult(^^=ucfirst(name)$$.getList(wr.responses));
  ^^}$$
 ^^postquery();$$
		}
	}
			^^}else if(api.type == "get"){$$
	public static ExceptionCode ^^=api.name$$(String id, Context context) {
		try{
 ^^prequery("get", api.name);$$
  ^^if(androidProvider){$$
							^^=ucfirst(name)$$Utils.save(new ^^=ucfirst(name)$$(wr.response), context);
							return ExceptionCode.NullException;
  ^^}else{$$
							return ExceptionCode.withResult(new ^^=ucfirst(name)$$(wr.response));
  ^^}$$
 ^^postquery();$$
		}
	}
			^^}else if(api.type == "put"){$$
^^
//put !!!!!!!!!!!!!!!!!!!!!!
param = "";
if(!api.field){
	param += ucfirst(name) + " data, ";
}else{
	for (var key in api.field){
		param += dbdef.getType(dbdef.getField(key, fields),"java") + " " + key + ", ";
	}
}
if(api.code)
	param += "String code, "
$$
	public static ExceptionCode ^^=api.name$$(String id, ^^=param$$Context context) {
		try{
^^if(!api.field){$$
			JSONObject jo = data.toJSONObject();
^^}else{$$
			JSONObject jo = new JSONObject();
 ^^for (var key in api.field){$$
			jo.put("^^=key$$", ^^=key$$);
 ^^}$$
^^}$$
 ^^prequery("put", api.name);$$
  ^^if(androidProvider){$$
   ^^if(api.field){$$
						^^=ucfirst(name)$$ data = new ^^=ucfirst(name)$$(jo);
   ^^}$$
							data.setId(id);
							^^=ucfirst(name)$$Utils.save(data, context);
							return ExceptionCode.NullException;
  ^^}else{$$
				return ExceptionCode.NullException;
  ^^}$$
 ^^postquery();$$
		}
	}
			^^}else if(api.type == "post"){$$
//post!!!!!!!!!!!!!!!!!!!!!!!!!!!
	public static ExceptionCode ^^=api.name$$(^^=ucfirst(name)$$ data, Context context) {
		try{
			JSONObject jo = data.toJSONObject();
 ^^prequery("post", api.name);$$
				return ExceptionCode.NullException;
 ^^postquery();$$
	}
			^^}else if(api.type == "delete"){$$
	public static ExceptionCode ^^=api.name$$(String id, Context context) {
		try{
 ^^prequery("delete", api.name);$$
							return ExceptionCode.NullException;
 ^^postquery();$$
		}

	}

			^^}$$
	^^}$$

^^})$$

^^if(restful){$$
	public static ExceptionCode get^^=ucfirst(name)$$(String id, Context context){
		try{
 ^^prequery("get", name);$$
  ^^if(androidProvider){$$
							^^=ucfirst(name)$$Utils.save(new ^^=ucfirst(name)$$(wr.response), context);
							return ExceptionCode.NullException;
  ^^}else{$$
							return ExceptionCode.withResult(new ^^=ucfirst(name)$$(wr.response));
  ^^}$$
 ^^postquery();$$
		}
	}
	public static ExceptionCode put^^=ucfirst(name)$$(String id, ^^=ucfirst(name)$$ data, Context context) {
		try{
			JSONObject jo = data.toJSONObject();
 ^^prequery("put", name);$$
  ^^if(androidProvider){$$
							^^=ucfirst(name)$$Utils.save(data, context);
							return ExceptionCode.NullException;
  ^^}else{$$
				return ExceptionCode.NullException;
  ^^}$$

 ^^postquery();$$
		}
	}
	public static ExceptionCode post^^=ucfirst(name)$$(^^=ucfirst(name)$$ data, Context context) {
		try{
			JSONObject jo = data.toJSONObject();
 ^^prequery("post", name);$$
			return ExceptionCode.NullException;
 ^^postquery();$$
		}
	}
	public static ExceptionCode delete^^=ucfirst(name)$$(String id, Context context) {
		try{
 ^^prequery("delete", name);$$
			return ExceptionCode.NullException;
 ^^postquery();$$
		}
	}
^^}$$
^^if(path){$$
 ^^uploadApis.forEach(function(api){$$
  ^^if(api.media == "image"){$$
	public static ExceptionCode upload^^=ucfirst(name)$$^^=ucfirst(api.name)$$(String id, Bitmap bitmap, Context context) {
		try{
 ^^prequery("postImage", name + "/" + api.name);$$
		^^if(auth){$$
			^^=ucfirst(name)$$Utils.save(new ^^=ucfirst(name)$$(wr.response), context);
		^^}$$
			return ExceptionCode.NullException;
 ^^postquery();$$
		}
	}
 ^^}else{$$
	public static ExceptionCode upload^^=ucfirst(name)$$^^=ucfirst(api.name)$$(String id, String path, Context context) {
		try{
 ^^prequery("postFile", name + "/" + api.name);$$
		^^if(auth){$$
			^^=ucfirst(name)$$Utils.save(new ^^=ucfirst(name)$$(wr.response), context);
		^^}$$
			return ExceptionCode.NullException;
 ^^postquery();$$
		}
	}


 ^^}$$
 ^^})$$
^^}$$
