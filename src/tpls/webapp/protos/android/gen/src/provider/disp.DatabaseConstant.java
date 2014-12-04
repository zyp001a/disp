package com.^^=cop$$.^^=name.toLowerCase()$$.provider;

import android.net.Uri;

public class DatabaseConstant {
	public static final String AUTHORITY = "com.^^=cop$$.^^=name.toLowerCase()$$.provider";
	public final static int FALSE = 0;
	public final static int TRUE = 1;

^^androidProviders.forEach(function(pr){$$
	public static final class ^^=ucfirst(pr.name)$$Constant {
		public final static String TABLE_NAME = "^^=pr.name$$";
		public final static Uri CONTENT_URI = Uri.parse("content://" + AUTHORITY + "/" + ^^=ucfirst(pr.name)$$Constant.TABLE_NAME);

 ^^schemas[pr.name].fields.forEach(function(f){$$
		public final static String ^^=f.name.toUpperCase()$$ = "^^=f.name$$";
 ^^})$$
	}
^^})$$

}
