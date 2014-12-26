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
//errorCode 1 duplicate phone error
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
	public static ExceptionCode ^^=name$$SendSMSSignupPseudo(String phone, Context context) {
//errorCode 1 duplicate phone error
		try {
			JSONObject jo = new JSONObject();
			jo.put("phone", phone);
			jo.put("pseudo", true);
			HttpResult wr = HttpUtils.postJSON(
				serverURI + "/api/^^=name$$/sendSMSSignup", jo);
			^^prequery()$$
					 return ExceptionCode.NullException;
			^^postquery()$$
		}
	}
	public static ExceptionCode ^^=name$$SendSMS(String phone, Context context) {
		try {
			JSONObject jo = new JSONObject();
			jo.put("phone", phone);
			HttpResult wr = HttpUtils.postJSON(
				serverURI + "/api/^^=name$$/sendSMS", jo);
			^^prequery()$$
					 return ExceptionCode.NullException;
			^^postquery()$$
		}
	}
	public static ExceptionCode ^^=name$$SendSMSPseudo(String phone, Context context) {
		try {
			JSONObject jo = new JSONObject();
			jo.put("phone", phone);
			jo.put("pseudo", true);
			HttpResult wr = HttpUtils.postJSON(
				serverURI + "/api/^^=name$$/sendSMS", jo);
			^^prequery()$$
					 return ExceptionCode.NullException;
			^^postquery()$$
		}
	}

	public static ExceptionCode ^^=name$$VerifySMS(String phone, String code, Context context) {
		try {
			JSONObject jo = new JSONObject();
			jo.put("phone", phone);
			jo.put("code", code);
			HttpResult wr = HttpUtils.postJSON(
				serverURI + "/api/^^=name$$/verifySMS", jo);
			^^prequery()$$
				if(wr.response.getBoolean("result"))
					return ExceptionCode.withResult(1);
				else
					return ExceptionCode.withResult(0);
			^^postquery()$$
		}
	}

