	public static ExceptionCode signin(String username, String password, Context context) {
		try {
			JSONObject jo = new JSONObject();
			jo.put("username", username);
			jo.put("password", password);
			HttpResult wr = HttpUtils.postJSON(
				serverURI + "/api/signin", jo);
			if (wr.statusCode == 200)
				^^=ucfirst(auth)$$Utils.save(wr.response, context);
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

