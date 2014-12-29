package com.^^=ns$$.gen.provider;

import com.^^=ns$$.gen.provider.DatabaseConstant.^^=ucfirst(name)$$Constant;
import com.^^=ns$$.gen.model.^^=ucfirst(name)$$;
import com.^^=ns$$.gen.dep.DateUtils;
import java.util.List;
import java.util.ArrayList;
import org.json.JSONObject;
import org.json.JSONArray;
import org.json.JSONException;
import android.content.ContentResolver;
import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;


public class ^^=ucfirst(name)$$Utils {

	public static List<^^=ucfirst(name)$$> getList(Context context) {
		^^if(useridField){$$
		Cursor c = context.getContentResolver().query(^^=ucfirst(name)$$Constant.CONTENT_URI,	null, ^^=ucfirst(name)$$Constant.^^=useridField.toUpperCase()$$ + " = ? ", new String[] { ^^=ucfirst(auth)$$Utils.getId(context) }, null);
		^^}else{$$
		Cursor c = context.getContentResolver().query(^^=ucfirst(name)$$Constant.CONTENT_URI,	null, null, null, null);
		^^}$$
		List<^^=ucfirst(name)$$> list = new ArrayList<^^=ucfirst(name)$$>();
		if (c != null) {
			while (c.moveToNext()) {
				list.add(new ^^=ucfirst(name)$$(c));
			}
			c.close();
		}
		return list;
	}

	public static ^^=ucfirst(name)$$ get(String id, Context context) {
		Cursor c = context.getContentResolver().query(^^=ucfirst(name)$$Constant.CONTENT_URI,	null, ^^=ucfirst(name)$$Constant.^^=idField.toUpperCase()$$ + " = ? ", new String[] { id }, null);
		^^=ucfirst(name)$$ item = null;
		if (c != null) {
			if (c.moveToNext()) {
				item = new ^^=ucfirst(name)$$(c);
			}
			c.close();
		}
		return item;
	}


	public static boolean save(^^=ucfirst(name)$$ obj, Context context) throws JSONException {
		ContentValues values = obj.toContentValues();
 ^^if(passwordField){$$
		values.put(^^=ucfirst(name)$$Constant.PRESENT, 1);
 ^^}$$
		int count = context.getContentResolver().update(
			^^=ucfirst(name)$$Constant.CONTENT_URI, values, null, null);
		return count > 0;
	}

	public static boolean saveList(List<^^=ucfirst(name)$$> li, Context context) throws JSONException {
		for(int i=0; i<li.size(); i++){
			ContentValues values = li.get(i).toContentValues();
			int count = context.getContentResolver().update(
				^^=ucfirst(name)$$Constant.CONTENT_URI, values, null, null);
		}
		return true;
	}
	^^if(useridField){$$
	public static void delete(String ^^=useridField$$, Context context){
		ContentResolver mContentResolver = context.getApplicationContext()
			.getContentResolver();
		mContentResolver.delete(^^=ucfirst(name)$$Constant.CONTENT_URI, ^^=ucfirst(name)$$Constant.^^=useridField.toUpperCase()$$ + "=?",
														new String[] { ^^=useridField$$ });
	}
	^^}$$
	public static void clear(Context context){
		ContentResolver mContentResolver = context.getApplicationContext()
			.getContentResolver();
		mContentResolver.delete(^^=ucfirst(name)$$Constant.CONTENT_URI, null, null);
	}

}
