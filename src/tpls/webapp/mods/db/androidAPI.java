^^apis.forEach(function(api){$$
			^^if(api.type == "gets"){$$
	public static ExceptionCode ^^=api.name$$(Context context) {
		try {
			^^if(!auth){$$
			HttpResult wr = HttpUtils.get(serverURI + "/api/^^=api.name$$/");
			^^}else{$$
			HttpResult wr = HttpUtils.getBearer(serverURI + "/api/^^=api.name$$/", ^^=ucfirst(auth)$$Utils.getToken(context));
			^^}$$
			if (wr.statusCode == 200)
				^^=ucfirst(name)$$Utils.saveList(wr.responses, context);
			else
				return new ExceptionCode(1, wr.value);
			return ExceptionCode.NullException;
		} catch (SocketTimeoutException e) {
			return new ExceptionCode(102,e);
		} catch (ConnectException e) {
			return new ExceptionCode(101, e);
		} catch (IOException e) {
			return new ExceptionCode(100,e);
		} catch (Exception e) {
			return new ExceptionCode(e);
		}
	}
			^^}else if(api.type == "get"){$$

			^^}else if(api.type == "post"){$$

			^^}else if(api.type == "put"){$$
	public static ExceptionCode ^^=api.name$$(String id, Context context) {
		try {
			^^if(!auth){$$
			HttpResult wr = HttpUtils.get(serverURI + "/api/^^=api.name$$/"+id);
			^^}else{$$
			HttpResult wr = HttpUtils.getBearer(serverURI + "/api/^^=api.name$$/"+id, ^^=ucfirst(auth)$$Utils.getToken(context));
			^^}$$
			if (wr.statusCode == 200)
				^^=ucfirst(name)$$Utils.save(wr.response, context);
			else
				return new ExceptionCode(1, wr.value);
			return ExceptionCode.NullException;
		} catch (SocketTimeoutException e) {
			return new ExceptionCode(102,e);
		} catch (ConnectException e) {
			return new ExceptionCode(101, e);
		} catch (IOException e) {
			return new ExceptionCode(100,e);
		} catch (Exception e) {
			return new ExceptionCode(e);
		}
	}
			^^}$$
^^})$$


^^if(restful){$$
	public static ExceptionCode get^^=ucfirst(name)$$(String id, Context context) {
		try {
			^^if(!auth){$$
			HttpResult wr = HttpUtils.get(serverURI + "/api/^^=name$$/"+id);
			^^}else{$$
			HttpResult wr = HttpUtils.getBearer(serverURI + "/api/^^=name$$/"+id, ^^=ucfirst(auth)$$Utils.getToken(context));
			^^}$$
			if (wr.statusCode == 200)
				if(wr.response.has("error"))
					return new ExceptionCode(1, wr.value);
				else{
					^^=ucfirst(name)$$Utils.save(wr.response, context);
					return ExceptionCode.NullException;
//					return ExceptionCode.withResult(new ^^=ucfirst(name)$$(wr.response));
				}
			else
				return new ExceptionCode(10, wr.value);
		} catch (SocketTimeoutException e) {
			return new ExceptionCode(102,e);
		} catch (ConnectException e) {
			return new ExceptionCode(101, e);
		} catch (IOException e) {
			return new ExceptionCode(100,e);
		} catch (Exception e) {
			return new ExceptionCode(e);
		}
	}
		public static ExceptionCode post^^=ucfirst(name)$$(^^=ucfirst(name)$$ data, Context context) {
		try {
			JSONObject jo = data.toJSONObject();
			
			^^if(!auth){$$
			HttpResult wr = HttpUtils.postJSON(serverURI + "/api/^^=name$$/", jo);
			^^}else{$$
			HttpResult wr = HttpUtils.postJSONBearer(serverURI + "/api/^^=name$$/", jo, ^^=ucfirst(auth)$$Utils.getToken(context));
			^^}$$
			if (wr.statusCode == 200)
				if(wr.response.has("error"))
					return new ExceptionCode(1, wr.value);
				else{
					return ExceptionCode.withResult(wr.response.getString("insertId"));
				}
			else
				return new ExceptionCode(10, wr.value);

		} catch (SocketTimeoutException e) {
			return new ExceptionCode(102,e);
		} catch (ConnectException e) {
			return new ExceptionCode(101, e);
		} catch (IOException e) {
			return new ExceptionCode(100,e);
		} catch (Exception e) {
			return new ExceptionCode(e);
		}
	}
		public static ExceptionCode put^^=ucfirst(name)$$(String id, ^^=ucfirst(name)$$ data, Context context) {
		try {
			JSONObject jo = data.toJSONObject();
			
			^^if(!auth){$$
			HttpResult wr = HttpUtils.putJSON(serverURI + "/api/^^=name$$/"+id, jo);
			^^}else{$$
			HttpResult wr = HttpUtils.putJSONBearer(serverURI + "/api/^^=name$$/"+id, jo, ^^=ucfirst(auth)$$Utils.getToken(context));
			^^}$$
			if (wr.statusCode == 200)
				if(wr.response.has("error"))
					return new ExceptionCode(1, wr.value);
				else
					return ExceptionCode.NullException;
			else
				return new ExceptionCode(10, wr.value);
			
		} catch (SocketTimeoutException e) {
			return new ExceptionCode(102,e);
		} catch (ConnectException e) {
			return new ExceptionCode(101, e);
		} catch (IOException e) {
			return new ExceptionCode(100,e);
		} catch (Exception e) {
			return new ExceptionCode(e);
		}
	}
	public static ExceptionCode delete^^=ucfirst(name)$$(String id, Context context) {
		try {
			^^if(!auth){$$
			HttpResult wr = HttpUtils.delete(serverURI + "/api/^^=name$$/"+id);
			^^}else{$$
			HttpResult wr = HttpUtils.deleteBearer(serverURI + "/api/^^=name$$/"+id, ^^=ucfirst(auth)$$Utils.getToken(context));
			^^}$$
			if (wr.statusCode == 200)
				if(wr.response.has("error"))
					return new ExceptionCode(1, wr.value);
				else
					return ExceptionCode.NullException;
			else
				return new ExceptionCode(10, wr.value);
		} catch (SocketTimeoutException e) {
			return new ExceptionCode(102,e);
		} catch (ConnectException e) {
			return new ExceptionCode(101, e);
		} catch (IOException e) {
			return new ExceptionCode(100,e);
		} catch (Exception e) {
			return new ExceptionCode(e);
		}
	}
^^}$$
^^if(path){$$
			 ^^uploadApis.forEach(function(api){$$
						 ^^if(api.media == "image"){$$
	public static ExceptionCode upload^^=ucfirst(api.name)$$(Bitmap bitmap, Context context) {
		try {
	^^if(!auth){$$
			HttpResult wr = HttpUtils.postBitmap(serverURI + "/api/^^=api.path$$/", "a.jpg", bitmap);
	^^}else{$$
			HttpResult wr = HttpUtils.postBitmapBearer(serverURI + "/api/^^=api.path$$/", "a.jpg", bitmap, ^^=ucfirst(auth)$$Utils.getToken(context));
	^^}$$
			if (wr.statusCode != 200)
				return new ExceptionCode(1, wr.value);
			return ExceptionCode.NullException;
		} catch (SocketTimeoutException e) {
			return new ExceptionCode(102,e);
		} catch (ConnectException e) {
			return new ExceptionCode(101, e);
		} catch (IOException e) {
			return new ExceptionCode(100,e);
		} catch (Exception e) {
			return new ExceptionCode(e);
		}
	}
						 ^^}$$
									^^})$$
^^}$$
