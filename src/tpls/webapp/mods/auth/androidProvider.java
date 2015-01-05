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
		String s = null;
		if (c != null) {
			if (c.moveToNext()) {
				s = c.getString(c.getColumnIndex(^^=ucfirst(db)$$Constant.^^=schema.tokenField.toUpperCase()$$));
			}
			c.close();
		}
		return s;
	}
	public static String getId(Context context) {
		Cursor c = context.getContentResolver().query(^^=ucfirst(db)$$Constant.CONTENT_URI, null, ^^=ucfirst(db)$$Constant.PRESENT + " = ? ", new String[] { "1" }, null);
		String s = null;
		if (c != null) {
			if (c.moveToNext()) {
				s = c.getString(c.getColumnIndex(^^=ucfirst(db)$$Constant.^^=schema.idField.toUpperCase()$$));
			}
			c.close();
		}
		return s;
	}
	^^if(dbdef.getType(schema.fields[0], "java")=="long"){$$
	public static long getIdLong(Context context) {
		Cursor c = context.getContentResolver().query(^^=ucfirst(db)$$Constant.CONTENT_URI, null, ^^=ucfirst(db)$$Constant.PRESENT + " = ? ", new String[] { "1" }, null);
		long s = 0;
		if (c != null) {
			if (c.moveToNext()) {
				s = c.getLong(c.getColumnIndex(^^=ucfirst(db)$$Constant.^^=schema.idField.toUpperCase()$$));
			}
			c.close();
		}
		return s;
	}
		^^}$$
	public static String getUser(Context context) {
		Cursor c = context.getContentResolver().query(^^=ucfirst(db)$$Constant.CONTENT_URI, null, ^^=ucfirst(db)$$Constant.PRESENT + " = ? ", new String[] { "1" }, null);
		String s = null;
		if (c != null) {
			if (c.moveToNext()) {
				s = c.getString(c.getColumnIndex(^^=ucfirst(db)$$Constant.^^=schema.usernameField.toUpperCase()$$));
			}
			c.close();
		}
		return s;
	}
	public static boolean save(JSONObject jo, Context context) throws JSONException {
		ContentValues values = new ContentValues();
		values.put(^^=ucfirst(db)$$Constant.^^=schema.idField.toUpperCase()$$, jo.getString("id"));
		values.put(^^=ucfirst(db)$$Constant.^^=schema.usernameField.toUpperCase()$$, jo.getString("username"));
		values.put(^^=ucfirst(db)$$Constant.^^=schema.tokenField.toUpperCase()$$, jo.getString("token"));

		values.put(^^=ucfirst(db)$$Constant.PRESENT, 1);

		
		int count = context.getContentResolver().update(
			^^=ucfirst(db)$$Constant.CONTENT_URI, values, null, null);
		return count > 0;
	}
	public static boolean save(String id, String user, String token, Context context) {
		ContentValues values = new ContentValues();
		values.put(^^=ucfirst(db)$$Constant.^^=schema.idField.toUpperCase()$$, id);
		values.put(^^=ucfirst(db)$$Constant.^^=schema.usernameField.toUpperCase()$$, user);
		values.put(^^=ucfirst(db)$$Constant.^^=schema.tokenField.toUpperCase()$$, token);
		values.put(^^=ucfirst(db)$$Constant.PRESENT, 1);

		
		int count = context.getContentResolver().update(
			^^=ucfirst(db)$$Constant.CONTENT_URI, values, null, null);
		return count > 0;
	}



}
