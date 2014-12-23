^^function prequery(){$$
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


	public static ExceptionCode ^^=name+ucfirst(signin)$$(String username, String password, Context context) {
//1 username error
//2 password error
		try {
			JSONObject jo = new JSONObject();
			jo.put("username", username);
			jo.put("password", password);
			HttpResult wr = HttpUtils.postJSON(
				serverURI + "/api/^^=name$$/^^=signin$$", jo);
			^^prequery()$$
					^^=ucfirst(name)$$Utils.save(wr.response, context);
					return ExceptionCode.NullException;
			^^postquery()$$
		}
	}

	public static ExceptionCode ^^=name+ucfirst(signup)$$(String username, String password, String code, Context context) {
		try {
			JSONObject jo = new JSONObject();
			jo.put("username", username);
			jo.put("password", password);
			jo.put("code", code);
			HttpResult wr = HttpUtils.postJSON(
				serverURI + "/api/^^=name$$/^^=signup$$", jo);
			^^prequery()$$
^^if(signinAfterSignup){$$
					^^=ucfirst(name)$$Utils.save(wr.response, context);
^^}$$
					return ExceptionCode.NullException;
			^^postquery()$$
		}
	}

