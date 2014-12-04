package com.^^=cop$$.^^=name.toLowerCase()$$.provider;

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

^^androidProviders.forEach(function(pr){$$		
			db.execSQL("Create table " + DatabaseConstant.^^=ucfirst(pr.name)$$Constant.TABLE_NAME + " (" 
 ^^var len = schemas[pr.name].fields.length;
								 function getSqlLiteString(str){
									 switch(str){
									 case "String":
										 return "TEXT";
										 break;
									 case "Integer":
										 return "INTEGER";
										 break;
									 default:
										 return "TEXT";
									 }
								 }
 $$
 ^^schemas[pr.name].fields.forEach(function(f,i){$$
  ^^if(i!=len-1){$$
				 + DatabaseConstant.^^=ucfirst(pr.name)$$Constant.^^=f.name.toUpperCase()$$ + " ^^=getSqlLiteString(f.type)$$,"
  ^^}else{$$
				 + DatabaseConstant.^^=ucfirst(pr.name)$$Constant.^^=f.name.toUpperCase()$$ + " ^^=getSqlLiteString(f.type)$$);");
  ^^}$$
 ^^})$$
^^})$$

	}

	@Override
	public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {

	}

}
