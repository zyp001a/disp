	public static ExceptionCode signin(String username, String password, Context context) {
		try {
			JSONObject jo = new JSONObject();
			jo.put("username", username);
			jo.put("password", password);
			HttpResult wr = HttpUtils.httpPost(
				serverURI + "/api/signin", jo);
			if (wr.statusCode == 200)
				^^=ucfirst(auth)$$Utils.save(wr.response, context);
			else
				return new ExceptionCode(1, wr.value);
			return ExceptionCode.NullException;
		} catch (Exception e) {
			return new ExceptionCode(e);
		}
	}

