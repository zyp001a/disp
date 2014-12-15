	public static ExceptionCode ^^=name$$SendSMS(String phone, Context context) {
		try {
			JSONObject jo = new JSONObject();
			jo.put("phone", phone);
			HttpResult wr = HttpUtils.postJSON(
				serverURI + "/api/^^=name$$/sendSMS", jo);
			if (wr.statusCode != 200)
				return new ExceptionCode(1, wr.value);
			else if(wr.response.has("error")){
				if(wr.response.has("errorCode")){
//1 duplicate phone error
					return new ExceptionCode(wr.response.getInt("errorCode"), wr.response.getString("error"));
				}else{
//10 error with message
					return new ExceptionCode(10, wr.value);
				}
			}else
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
	public static ExceptionCode ^^=name$$SendSMSPseudo(String phone, Context context) {
		try {
			JSONObject jo = new JSONObject();
			jo.put("phone", phone);
			jo.put("pseudo", true);
			HttpResult wr = HttpUtils.postJSON(
				serverURI + "/api/^^=name$$/sendSMS", jo);
			if (wr.statusCode != 200)
				return new ExceptionCode(1, wr.value);
			else
				return ExceptionCode.withResult(wr.response.getString("code"));
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
	public static ExceptionCode ^^=name$$VerifySMS(String phone, String code, Context context) {
		try {
			JSONObject jo = new JSONObject();
			jo.put("phone", phone);
			jo.put("code", code);
			HttpResult wr = HttpUtils.postJSON(
				serverURI + "/api/^^=name$$/verifySMS", jo);
			if (wr.statusCode == 200)
				if(wr.response.getBoolean("result"))
					return ExceptionCode.withResult(1);
				else
					return ExceptionCode.withResult(0);
			else
				return new ExceptionCode(1, wr.value);
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

