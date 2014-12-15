package com.^^=ns$$.gen.provider;

import com.^^=ns$$.gen.provider.DatabaseConstant.^^=ucfirst(name)$$Constant;
import com.^^=ns$$.gen.model.^^=ucfirst(name)$$;
import com.^^=ns$$.gen.dep.DateUtils;
import java.util.List;
import java.util.ArrayList;
import org.json.JSONObject;
import org.json.JSONException;
import android.content.ContentResolver;
import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;


public class ^^=ucfirst(name)$$Utils {
	public static ^^=ucfirst(name)$$ parseCursor(Cursor c){
		^^=ucfirst(name)$$ item = new ^^=ucfirst(name)$$();
				^^fields.forEach(function(f){
						var type=dbdef.getType(f, "java");$$
						^^if(type == "boolean"){$$ 
		item.^^=f.name$$ = c.getInt(c.getColumnIndex(^^=ucfirst(name)$$Constant.^^=f.name.toUpperCase()$$)) == 1;
						^^}else if(type=="Date"){$$
		item.^^=f.name$$ = DateUtils.parseDate(c.getString(c.getColumnIndex(^^=ucfirst(name)$$Constant.^^=f.name.toUpperCase()$$)));
						^^}else{$$
		item.^^=f.name$$ = c.get^^=ucfirst(type)$$(c.getColumnIndex(^^=ucfirst(name)$$Constant.^^=f.name.toUpperCase()$$));
						^^}$$
				^^})$$
		return item;
	}
	public static List<^^=ucfirst(name)$$> getList(Context context) {
		^^if(usernameField){$$
		Cursor c = context.getContentResolver().query(^^=ucfirst(name)$$Constant.CONTENT_URI,	null, 
																									^^=ucfirst(name)$$Constant.^^=usernameField.toUpperCase()$$ + " = ? ", 
																									new String[] { ^^=ucfirst(auth)$$Utils.getUser(context) }, null);
		^^}else{$$
		Cursor c = context.getContentResolver().query(^^=ucfirst(name)$$Constant.CONTENT_URI,	null, null, null, null);
		^^}$$
		List<^^=ucfirst(name)$$> list = new ArrayList<^^=ucfirst(name)$$>();
		if (c != null) {
			while (c.moveToNext()) {
				list.add(^^=ucfirst(name)$$Utils.parseCursor(c));
			}
			c.close();
		}
		return list;
	}
	^^if(idField){$$
	public static ^^=ucfirst(name)$$ get(String id,Context context) {
		Cursor c = context.getContentResolver().query(^^=ucfirst(name)$$Constant.CONTENT_URI,	null, 
																									^^=ucfirst(name)$$Constant.^^=idField.toUpperCase()$$ + " = ? ", 
																									new String[] { id }, null);

		^^=ucfirst(name)$$ item = null;
		if (c != null) {
			if (c.moveToNext()) {
				item = ^^=ucfirst(name)$$Utils.parseCursor(c);
			}
			c.close();
		}
		return item;
	}
	^^}$$

	public static boolean save(JSONObject jo, Context context) throws JSONException {
		ContentValues values = new ContentValues();
^^fields.forEach(function(f){$$
 ^^if(passwordField && f.name==passwordField){$$
 ^^}else if(tokenField && f.name==tokenField){$$
 ^^}else{$$
		if(jo.has("^^=f.name$$")){
			values.put(^^=ucfirst(name)$$Constant.^^=f.name.toUpperCase()$$, jo.getString("^^=f.name$$"));
		}
 ^^}$$
^^})$$
 ^^if(passwordField){$$
		values.put(^^=ucfirst(name)$$Constant.PRESENT, 1);
 ^^}$$
		int count = context.getContentResolver().update(
			^^=ucfirst(name)$$Constant.CONTENT_URI, values, null, null);
		return count > 0;
	}

	public static void delete(String ^^=usernameField$$, Context context){
		ContentResolver mContentResolver = context.getApplicationContext()
			.getContentResolver();
		mContentResolver.delete(^^=ucfirst(name)$$Constant.CONTENT_URI, ^^=ucfirst(name)$$Constant.^^=usernameField.toUpperCase()$$ + "=?",
														new String[] { ^^=usernameField$$ });
	}
	public static void clear(Context context){
		ContentResolver mContentResolver = context.getApplicationContext()
			.getContentResolver();
		mContentResolver.delete(^^=ucfirst(name)$$Constant.CONTENT_URI, null, null);
	}

}
