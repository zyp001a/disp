package com.^^=ns$$.provider;

import com.^^=ns$$.provider.DatabaseConstant.^^=ucfirst(name)$$Constant;


import org.json.JSONObject;
import org.json.JSONException;
import android.content.ContentResolver;
import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;


public class ^^=ucfirst(name)$$Utils {
	^^if(tokenField){$$
	public static String getToken(Context context) {
		Cursor c = context.getContentResolver().query(UsersConstant.CONTENT_URI,
																									null, null, null, null);
		if (c != null) {
			if (c.moveToNext()) {
				return c.getString(c.getColumnIndex(UsersConstant.^^=tokenField.toUpperCase()$$));
			}
			c.close();
		}
		return null;
	}
	public static boolean saveToken(JSONObject jo, Context context) throws JSONException {
		ContentValues values = new ContentValues();
		
		values.put(UsersConstant.PHONE, jo.getString("username"));
		values.put(UsersConstant.TOKEN, jo.getString("token"));
		
		int count = context.getContentResolver().update(
			UsersConstant.CONTENT_URI, values, null, null);
		return count > 0;
	}
	^^}$$
	public static void get(Context context) {
		Cursor c = context.getContentResolver().query(^^=ucfirst(name)$$Constant.CONTENT_URI,
																									null, null, null, null);
		if (c != null) {
			if (c.moveToNext()) {
				^^fields.forEach(function(f){$$
				c.getString(c.getColumnIndex(^^=ucfirst(name)$$Constant.^^=f.name.toUpperCase()$$));
				^^})$$
			}
			c.close();
		}

	}

	public static boolean save(JSONObject jo, Context context) {
		ContentValues values = new ContentValues();
		^^fields.forEach(function(f){$$
		values.put(^^=ucfirst(name)$$Constant.^^=f.name.toUpperCase()$$, "123");
		^^})$$
		int count = context.getContentResolver().update(
			^^=ucfirst(name)$$Constant.CONTENT_URI, values, null, null);
		return count > 0;
	}

	public static void delete(String ^^=usernameField$$, Context context) {
		ContentResolver mContentResolver = context.getApplicationContext()
			.getContentResolver();
		mContentResolver.delete(^^=ucfirst(name)$$Constant.CONTENT_URI, ^^=ucfirst(name)$$Constant.^^=usernameField.toUpperCase()$$ + "=?",
														new String[] { ^^=usernameField$$ });
	}

}
