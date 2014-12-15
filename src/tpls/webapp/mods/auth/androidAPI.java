	public static ExceptionCode ^^=name+ucfirst(signin)$$(String username, String password, Context context) {
		try {
			JSONObject jo = new JSONObject();
			jo.put("username", username);
			jo.put("password", password);
			HttpResult wr = HttpUtils.postJSON(
				serverURI + "/api/^^=name$$/^^=signin$$", jo);
			if (wr.statusCode == 200){
				if(wr.response.has("error")){
					if(wr.response.has("errorCode")){
//1 username error
//2 password error
						return new ExceptionCode(wr.response.getInt("errorCode"), wr.response.getString("error"));
					}else{
//10 error with message
						return new ExceptionCode(10, wr.value);
					}
				}
				else{
					^^=ucfirst(name)$$Utils.save(wr.response, context);
				}
			}
			else{
				return new ExceptionCode(11, wr.value);
			}
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

	public static ExceptionCode ^^=name+ucfirst(signup)$$(String username, String password, String code, Context context) {
		try {
			JSONObject jo = new JSONObject();
			jo.put("username", username);
			jo.put("password", password);
			jo.put("code", code);
			HttpResult wr = HttpUtils.postJSON(
				serverURI + "/api/^^=name$$/^^=signup$$", jo);
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

