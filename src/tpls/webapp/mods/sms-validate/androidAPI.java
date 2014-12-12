	public static ExceptionCode ^^=name$$SendSMS(String phone, Context context) {
		try {
			JSONObject jo = new JSONObject();
			jo.put("phone", phone);
			HttpResult wr = HttpUtils.postJSON(
				serverURI + "/api/^^=name$$/sendSMS", jo);
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

