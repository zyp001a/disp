^^if(restful){$$
	public static ExceptionCode get^^=ucfirst(name)$$(String id, Context context) {
		try {
			^^if(!auth){$$
			HttpResult wr = HttpUtils.get(serverURI + "/api/^^=name$$/"+id);
			^^}else{$$
			HttpResult wr = HttpUtils.getBearer(serverURI + "/api/^^=name$$/"+id, ^^=ucfirst(auth)$$Utils.getToken(context));
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
