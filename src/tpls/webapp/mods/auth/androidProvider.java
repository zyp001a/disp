package com.^^=ns$$.gen.provider;

import com.^^=ns$$.gen.provider.DatabaseConstant.^^=ucfirst(db)$$Constant;


import org.json.JSONObject;
import org.json.JSONException;
import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;


public class ^^=ucfirst(name)$$Utils {
	public static String getToken(Context context) {
		Cursor c = context.getContentResolver().query(^^=ucfirst(db)$$Constant.CONTENT_URI, null, ^^=ucfirst(db)$$Constant.PRESENT + " = ? ", new String[] { "1" }, null);
		if (c != null) {
			if (c.moveToNext()) {
				return c.getString(c.getColumnIndex(^^=ucfirst(db)$$Constant.^^=schema.tokenField.toUpperCase()$$));
			}
			c.close();
		}
		return null;
	}
	public static String getUser(Context context) {
		Cursor c = context.getContentResolver().query(^^=ucfirst(db)$$Constant.CONTENT_URI, null, ^^=ucfirst(db)$$Constant.PRESENT + " = ? ", new String[] { "1" }, null);
		if (c != null) {
			if (c.moveToNext()) {
				return c.getString(c.getColumnIndex(^^=ucfirst(db)$$Constant.^^=schema.usernameField.toUpperCase()$$));
			}
			c.close();
		}
		return null;
	}
	public static boolean save(JSONObject jo, Context context) throws JSONException {
		ContentValues values = new ContentValues();
		
		values.put(^^=ucfirst(db)$$Constant.^^=schema.usernameField.toUpperCase()$$, jo.getString("username"));
		values.put(^^=ucfirst(db)$$Constant.^^=schema.tokenField.toUpperCase()$$, jo.getString("token"));

 ^^if(schema.passwordField){$$
		values.put(^^=ucfirst(db)$$Constant.PRESENT, 1);
 ^^}$$
		
		int count = context.getContentResolver().update(
			^^=ucfirst(db)$$Constant.CONTENT_URI, values, null, null);
		return count > 0;
	}
	public static boolean save(String user, String token, Context context) {
		ContentValues values = new ContentValues();
		
		values.put(^^=ucfirst(db)$$Constant.^^=schema.usernameField.toUpperCase()$$, user);
		values.put(^^=ucfirst(db)$$Constant.^^=schema.tokenField.toUpperCase()$$, token);

 ^^if(schema.passwordField){$$
		values.put(^^=ucfirst(db)$$Constant.PRESENT, 1);
 ^^}$$
		
		int count = context.getContentResolver().update(
			^^=ucfirst(db)$$Constant.CONTENT_URI, values, null, null);
		return count > 0;
	}



}
