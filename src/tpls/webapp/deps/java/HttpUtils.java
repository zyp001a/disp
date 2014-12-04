package com.^^=cop$$.^^=name.toLowerCase()$$.dep;

import com.^^=cop$$.^^=name.toLowerCase()$$.dep.HttpsTrustModifier.TrustModifier;


import java.io.IOException;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLEncoder;
import java.util.Iterator;

import javax.net.ssl.HttpsURLConnection;

import android.graphics.Bitmap;
import android.graphics.Bitmap.CompressFormat;

import org.json.JSONException;
import org.json.JSONObject;

public class HttpUtils {
	public static HttpResult httpGet(String urlString) {
		try {
			URL url = new URL(urlString);
			HttpURLConnection urlConnection = (HttpURLConnection) url
					.openConnection();
			urlConnection.setConnectTimeout(7000);
			urlConnection.setReadTimeout(7000);

			return new HttpResult(urlConnection);
		} catch (Exception e) {
			return new HttpResult(e.getMessage());
		}
	}

	public static HttpResult httpGetBearer(String urlString, String token) {
		try {
			URL url = new URL(urlString);
			HttpURLConnection urlConnection = (HttpURLConnection) url
					.openConnection();
			urlConnection
					.setRequestProperty("Authorization", "Bearer " + token);
			return new HttpResult(urlConnection);
		} catch (Exception e) {
			return new HttpResult(e.getMessage());
		}
	}

	public static HttpResult httpPost(String urlString) {
		try {
			URL url = new URL(urlString);
			HttpURLConnection urlConnection = (HttpURLConnection) url
					.openConnection();
			urlConnection.setRequestMethod("POST");
			urlConnection
					.setRequestProperty("Content-Type", "application/json");

			return new HttpResult(urlConnection);
		} catch (Exception e) {
			return new HttpResult(e.getMessage());
		}
	}

	public static HttpResult httpPost(String urlString, JSONObject jo) {
		try {
			URL url = new URL(urlString);
			HttpURLConnection urlConnection = (HttpURLConnection) url
					.openConnection();
			urlConnection.setRequestMethod("POST");
			urlConnection
					.setRequestProperty("Content-Type", "application/json");
			byte[] outputInBytes = jo.toString().getBytes("UTF-8");
			OutputStream os = urlConnection.getOutputStream();
			os.write(outputInBytes);
			os.flush();
			os.close();
			return new HttpResult(urlConnection);
		} catch (Exception e) {
			return new HttpResult(e.getMessage());
		}
	}

	public static HttpResult httpPostPlain(String urlString, String text) {
		try {
			URL url = new URL(urlString);
			HttpURLConnection urlConnection = (HttpURLConnection) url
					.openConnection();
			urlConnection.setRequestMethod("POST");
			urlConnection.setRequestProperty("Content-Type", "text/plain");
			byte[] outputInBytes = text.getBytes("UTF-8");
			OutputStream os = urlConnection.getOutputStream();
			os.write(outputInBytes);
			os.flush();
			os.close();
			return new HttpResult(urlConnection);
		} catch (Exception e) {
			return new HttpResult(e.getMessage());
		}
	}

	public static HttpResult httpPostBearer(String urlString, JSONObject jo,
			String token) {
		try {
			URL url = new URL(urlString);
			HttpURLConnection urlConnection = (HttpURLConnection) url
					.openConnection();

			urlConnection.setRequestMethod("POST");
			urlConnection
					.setRequestProperty("Content-Type", "application/json");
			urlConnection
					.setRequestProperty("Authorization", "Bearer " + token);

			byte[] outputInBytes = jo.toString().getBytes("UTF-8");
			OutputStream os = urlConnection.getOutputStream();
			os.write(outputInBytes);
			os.flush();
			os.close();
			return new HttpResult(urlConnection);
		} catch (Exception e) {
			return new HttpResult(e.getMessage());
		}
	}

	public static HttpResult httpPostBitMapBearer(String urlString,
			String filename, Bitmap bitmap, String token) {
		try {
			URL url = new URL(urlString);
			HttpURLConnection urlConnection = (HttpURLConnection) url
					.openConnection();
			urlConnection
					.setRequestProperty("Authorization", "Bearer " + token);
			urlConnection.setRequestMethod("POST");
			urlConnection.setDoOutput(true);

			HttpUtils.sendMultipartBitmap(urlConnection, filename, bitmap);

			return new HttpResult(urlConnection);
		} catch (Exception e) {
			return new HttpResult(e.getMessage());
		}
	}

	public static HttpResult httpsGet(String urlString) {
		try {
			URL url = new URL(urlString);
			HttpsURLConnection urlConnection = (HttpsURLConnection) url
					.openConnection();

			TrustModifier.relaxHostChecking(urlConnection);
			return new HttpResult(urlConnection);
		} catch (Exception e) {
			return new HttpResult(e.getMessage());
		}
	}

	public static HttpResult httpsPost(String urlString, JSONObject jo) {
		try {
			URL url = new URL(urlString);
			HttpsURLConnection urlConnection = (HttpsURLConnection) url
					.openConnection();

			TrustModifier.relaxHostChecking(urlConnection);
			urlConnection.setRequestMethod("POST");
			urlConnection
					.setRequestProperty("Content-Type", "application/json");
			urlConnection.setDoOutput(true);
			byte[] outputInBytes = jo.toString().getBytes("UTF-8");
			OutputStream os = urlConnection.getOutputStream();
			os.write(outputInBytes);
			os.flush();
			os.close();

			return new HttpResult(urlConnection);
		} catch (Exception e) {
			return new HttpResult(e.getMessage());
		}
	}

	public static HttpResult httpsPostForm(String urlString, JSONObject jo) {
		try {
			URL url = new URL(urlString);
			HttpsURLConnection urlConnection = (HttpsURLConnection) url
					.openConnection();

			TrustModifier.relaxHostChecking(urlConnection);

			urlConnection.setRequestMethod("POST");
			urlConnection.setRequestProperty("Content-Type",
					"application/x-www-form-urlencoded");
			byte[] outputInBytes = HttpUtils.encodeJson(jo).getBytes("UTF-8");
			OutputStream os = urlConnection.getOutputStream();
			os.write(outputInBytes);
			os.flush();
			os.close();
			return new HttpResult(urlConnection);
		} catch (Exception e) {
			return new HttpResult(e.getMessage());
		}
	}

	public static HttpResult httpsPostBearer(String urlString, JSONObject jo,
			String token) {
		try {
			URL url = new URL(urlString);
			HttpsURLConnection urlConnection = (HttpsURLConnection) url
					.openConnection();
			TrustModifier.relaxHostChecking(urlConnection);
			urlConnection.setRequestMethod("POST");
			urlConnection
					.setRequestProperty("Content-Type", "application/json");
			urlConnection
					.setRequestProperty("Authorization", "Bearer " + token);

			byte[] outputInBytes = jo.toString().getBytes("UTF-8");
			OutputStream os = urlConnection.getOutputStream();
			os.write(outputInBytes);
			os.flush();
			os.close();
			return new HttpResult(urlConnection);
		} catch (Exception e) {
			return new HttpResult(e.getMessage());
		}
	}

	public static HttpResult httpsGetBearer(String urlString, String token) {
		try {
			URL url = new URL(urlString);
			HttpsURLConnection urlConnection = (HttpsURLConnection) url
					.openConnection();
			TrustModifier.relaxHostChecking(urlConnection);
			urlConnection
					.setRequestProperty("Authorization", "Bearer " + token);
			return new HttpResult(urlConnection);
		} catch (Exception e) {
			return new HttpResult(e.getMessage());
		}
	}

	public static String encodeJson(JSONObject jo)
			throws UnsupportedEncodingException, JSONException {
		String data = "";
		Iterator<String> iterator = jo.keys();
		String key;
		while (iterator.hasNext()) {
			key = iterator.next();
			data += key;
			data += "=";
			data += URLEncoder.encode(jo.getString(key), "UTF-8");
			if (iterator.hasNext())
				data += "&";
		}
		return data;
	}

	public static void sendMultipartBitmap(HttpURLConnection urlConnection,
			String fileName, Bitmap bitmap) throws JSONException, IOException {
		String boundary = "===" + System.currentTimeMillis() + "===";
		String LINE_FEED = "\r\n";
		String charset = "UTF-8";
		String fieldName = "image";
		urlConnection.setRequestProperty("Content-Type",
				"multipart/form-data; boundary=" + boundary);

		OutputStream outputStream = urlConnection.getOutputStream();
		// OutputStream outputStream = new FileOutputStream(new
		// File(ClassUtil.getDir()+"/a.jpeg"));
		PrintWriter writer = new PrintWriter(new OutputStreamWriter(
				outputStream, charset), true);

		// append image
		writer.append("--" + boundary).append(LINE_FEED);
		writer.append(
				"Content-Disposition: form-data; name=\"" + fieldName
						+ "\"; filename=\"" + fileName + "\"")
				.append(LINE_FEED);
		writer.append(
				"Content-Type: "
						+ URLConnection.guessContentTypeFromName(fileName))
				.append(LINE_FEED);
		writer.append("Content-Transfer-Encoding: binary").append(LINE_FEED);
		writer.append(LINE_FEED);
		writer.flush();
		bitmap.compress(CompressFormat.JPEG, 100, outputStream);
		outputStream.flush();

		writer.append(LINE_FEED);

		// finish
		writer.append(LINE_FEED).flush();
		writer.append("--" + boundary + "--").append(LINE_FEED);
		writer.close();
		outputStream.close();
	}
}
