^^if(restful){$$
	public static ExceptionCode get^^=ucfirst(name)$$(String id, Context context) {
		try {
			^^if(!auth){$$
			HttpResult wr = HttpUtils.httpGet(serverURI + "/api/^^=name$$/"+id);
			^^}else{$$
			HttpResult wr = HttpUtils.httpGetBearer(serverURI + "/api/^^=name$$/"+id, ^^=ucfirst(auth)$$Utils.getToken(context));
			^^}$$
			if (wr.statusCode == 200)
				^^=ucfirst(name)$$Utils.save(wr.response, context);
			else
				return new ExceptionCode(1, wr.value);
			return ExceptionCode.NullException;
		} catch (Exception e) {
			return new ExceptionCode(e);
		}
	}
^^}$$
