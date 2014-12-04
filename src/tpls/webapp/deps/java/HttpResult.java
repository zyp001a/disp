package com.^^=cop$$.^^=name.toLowerCase()$$.dep;

import java.io.BufferedInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;

import org.json.JSONException;
import org.json.JSONObject;

public class HttpResult {

//	public int errorCode;
	public int statusCode;
	public String message;
	public String value;
	public JSONObject response;

	public HttpResult(String message) {
		this.message = message;
	}

	public HttpResult(HttpURLConnection urlConnection) throws IOException,
			JSONException {

		InputStream is = new BufferedInputStream(urlConnection.getInputStream());
		String str = StreamUtils.getStringFromInputStream(is);
		is.close();
		this.value = str;
		try {
			JSONObject jo = new JSONObject(str);
			this.statusCode = urlConnection.getResponseCode();
			this.response = jo;
//			this.errorCode = jo.getInt("code");
//			this.message = jo.getString("msg");
		} catch (Exception e) {
			this.message = e.getMessage();
		}

		urlConnection.disconnect();
	}
//
//	public String toString() {
//		String rtn = "code =" + errorCode + " msg=" + message;
//		if (response != null) {
//			rtn += ("\n" + "response: " + response.toString());
//		}
//		return rtn;
//	}
}
