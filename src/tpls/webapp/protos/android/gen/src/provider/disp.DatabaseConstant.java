package com.^^=cop$$.^^=name.toLowerCase()$$.gen.provider;

import android.net.Uri;

public class DatabaseConstant {
	public static final String AUTHORITY = "com.^^=cop$$.^^=name.toLowerCase()$$.gen.provider";
	public final static int FALSE = 0;
	public final static int TRUE = 1;

 ^^for (var smname in schemas){$$
	public static final class ^^=ucfirst(smname)$$Constant {
		public final static String TABLE_NAME = "^^=smname$$";
		public final static Uri CONTENT_URI = Uri.parse("content://" + AUTHORITY + "/" + ^^=ucfirst(smname)$$Constant.TABLE_NAME);
 ^^schemas[smname].fields.forEach(function(f){$$
		public final static String ^^=f.name.toUpperCase()$$ = "^^=f.name$$";
 ^^})$$
 ^^if(schemas[smname].passwordField){$$
		public final static String PRESENT = "present";
 ^^}$$
	}
^^}$$

}
