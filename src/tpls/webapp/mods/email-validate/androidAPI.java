^^function prequery(){$$
			if (wr.statusCode == 200)
				if(wr.response != null && wr.response.has("error")){
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

	public static ExceptionCode ^^=name$$SendSMSSignup(String phone, Context context) {
		try {
			JSONObject jo = new JSONObject();
			jo.put("phone", phone);
			HttpResult wr = HttpUtils.postJSON(
				serverURI + "/api/^^=name$$/sendSMSSignup", jo);
			^^prequery()$$
					 return ExceptionCode.NullException;
			^^postquery()$$
		}
	}
	public static ExceptionCode ^^=name$$SendEmail(String email, Context context) {
//errorCode 1 duplicate phone error
		try {
			JSONObject jo = new JSONObject();
			jo.put("email", email);
			HttpResult wr = HttpUtils.postJSON(
				serverURI + "/api/^^=name$$/sendEmail", jo);
			^^prequery()$$
					 return ExceptionCode.NullException;
			^^postquery()$$
		}
	}
