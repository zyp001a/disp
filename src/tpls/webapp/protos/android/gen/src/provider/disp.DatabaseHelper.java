package com.^^=cop$$.^^=name.toLowerCase()$$.gen.provider;

import android.content.Context;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;

public class DatabaseHelper extends SQLiteOpenHelper {
	public final static String DATABASE_NAME = "^^=name.toLowerCase()$$.db";
	public final static int DATABASE_VERSION = 1;

	public DatabaseHelper(Context context) {
		super(context, DATABASE_NAME, null, DATABASE_VERSION);
	}

	@Override
	public void onCreate(SQLiteDatabase db) {

^^for (var smname in schemas){$$		
			db.execSQL("Create table " + DatabaseConstant.^^=ucfirst(smname)$$Constant.TABLE_NAME + " (" 
 ^^var len = schemas[smname].fields.length;$$
 ^^schemas[smname].fields.forEach(function(f,i){$$
  ^^if(i!=len-1){$$
				 + DatabaseConstant.^^=ucfirst(smname)$$Constant.^^=f.name.toUpperCase()$$ + " ^^=dbdef.getType(f, 'sqlite')$$,"
  ^^}else{$$
				 + DatabaseConstant.^^=ucfirst(smname)$$Constant.^^=f.name.toUpperCase()$$ + " ^^=dbdef.getType(f, 'sqlite')$$"
  ^^}$$
 ^^})$$
 ^^if(schemas[smname].passwordField){$$
				 + "," + DatabaseConstant.^^=ucfirst(smname)$$Constant.PRESENT + " INTEGER);");
 ^^}else{$$
				+");");
 ^^}$$
								 


^^}$$

	}

	@Override
	public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {

	}

}
