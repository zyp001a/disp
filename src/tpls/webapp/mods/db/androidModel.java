package com.^^=ns$$.gen.model;

import org.json.JSONException;
import org.json.JSONObject;
import org.json.JSONArray;
import java.util.Date;
import java.util.List;
import android.text.TextUtils;
import com.^^=ns$$.gen.dep.DateUtils;
import com.^^=ns$$.gen.provider.DatabaseConstant.^^=ucfirst(name)$$Constant;
^^if(auth){$$
import com.^^=ns$$.gen.provider.^^=ucfirst(auth)$$Utils;
^^}$$
import com.^^=ns$$.gen.dep.StringUtils;
import android.database.Cursor;
import android.content.ContentValues;
import android.content.Context;
import java.util.ArrayList;
import com.^^=ns$$.gen.api.API;

^^function toJava(obj){$$
 ^^fields.forEach(function(f){
		 var type = dbdef.getType(f, "java");$$
			^^if(type == 'int' || type == 'long' || type == "double"){$$
		if(^^=f.name$$>0)
			^^=obj$$.put("^^=f.name$$", ^^=f.name$$);
			^^}else if(type == 'String'){$$
		if(!TextUtils.isEmpty(^^=f.name$$))
			^^=obj$$.put("^^=f.name$$", ^^=f.name$$);
			^^}else if(type == 'boolean'){$$
		if(^^=f.name$$)
			^^=obj$$.put("^^=f.name$$", ^^=f.name$$);
			^^}else if(type == 'Date'){$$
		if(^^=f.name$$ != null)
			^^=obj$$.put("^^=f.name$$", DateUtils.getString(^^=f.name$$));
			^^}else if(type == 'List<String>'){$$
    if(^^=f.name$$ != null){
			try{
				^^=obj$$.put("^^=f.name$$", StringUtils.getString(^^=f.name$$));
			}catch(JSONException e){
				//LOG　format error
			}
		}
			^^}$$
 ^^})$$
^^}$$

public class ^^=ucfirst(name)$$ {
	public static ^^=ucfirst(name)$$ Empty^^=ucfirst(name)$$ = new ^^=ucfirst(name)$$();
^^fields.forEach(function(f){$$
	public ^^=dbdef.getType(f, "java")$$ ^^=f.name$$; //^^=f.text$$
^^})$$
	public ^^=ucfirst(name)$$(){
	}
	public ^^=ucfirst(name)$$(JSONObject jo) throws JSONException{
 ^^fields.forEach(function(f){var type = dbdef.getType(f, "java");$$
		if(jo.has("^^=f.name$$"))
  ^^if(type == 'Date'){$$
			this.^^=f.name$$ = DateUtils.parseDate(jo.getString("^^=f.name$$"));
	^^}else if(type == "List<String>"){$$
			this.^^=f.name$$ = StringUtils.getList(jo.getJSONArray("^^=f.name$$"));
  ^^}else{$$
			this.^^=f.name$$ = jo.get^^=ucfirst(type)$$("^^=f.name$$");
  ^^}$$
 ^^})$$
	}
	public static List<^^=ucfirst(name)$$> getList(JSONArray ja)  throws JSONException{
		List<^^=ucfirst(name)$$> li = new ArrayList<^^=ucfirst(name)$$>();
		for (int i=0; i<ja.length(); i++){
			JSONObject jo = ja.getJSONObject(i);
			li.add(new ^^=ucfirst(name)$$(jo));
		}
		return li;
	}
	public ^^=ucfirst(name)$$(Cursor c){
				^^fields.forEach(function(f){
						var type=dbdef.getType(f, "java");$$
						^^if(type == "boolean"){$$ 
		this.^^=f.name$$ = c.getInt(c.getColumnIndex(^^=ucfirst(name)$$Constant.^^=f.name.toUpperCase()$$)) == 1;
						^^}else if(type=="Date"){$$
		this.^^=f.name$$ = DateUtils.parseDate(c.getString(c.getColumnIndex(^^=ucfirst(name)$$Constant.^^=f.name.toUpperCase()$$)));
						^^}else if(type=="List<String>"){$$
		try{
			this.^^=f.name$$ = StringUtils.getList(c.getString(c.getColumnIndex(^^=ucfirst(name)$$Constant.^^=f.name.toUpperCase()$$)));
		}catch(Exception e){
			//LOG
		}
						^^}else{$$
		this.^^=f.name$$ = c.get^^=ucfirst(type)$$(c.getColumnIndex(^^=ucfirst(name)$$Constant.^^=f.name.toUpperCase()$$));
						^^}$$
				^^})$$
		
	}
	public void setId(String id){
		^^if(fields[0].default == "autoinc"){$$
		this.^^=idField$$ = Long.parseLong(id);
				^^}else{$$
		this.^^=idField$$ = id;
				^^}$$
	}
	^^fields.forEach(function(f){$$
	 ^^if(f.type == "Array"){$$
	public List<String> getArray^^=ucfirst(f.name)$$() throws JSONException{
		List<String> li = new ArrayList<String>();
		JSONArray ja = new JSONArray(this.^^=f.name$$);
		for(int i=0; i<ja.length(); i++){
			li.add(ja.getString(i));
		}
		return li;
	}
	 ^^}$$
	^^})$$
^^if(path){$$
 ^^uploadApis.forEach(function(api){$$
  ^^if(api.media == "image"){$$
	public String getPath^^=ucfirst(api.name)$$(Context context){
		return API.serverURI + "/api/^^=name$$/^^=api.name$$/" 
			+ this.^^=api.name$$ 
			+"?access_token="+^^=ucfirst(auth)$$Utils.getToken(context);
	}
  ^^}$$
 ^^})$$
^^}$$

	public boolean isNull(){
		^^var type = dbdef.getType(fields[0], "basic");$$
		^^if(type == "string"){$$				 
			return TextUtils.isEmpty(^^=idField$$);
		^^}else{$$
			return ^^=idField$$ != 0;
		^^}$$		
	}
	public ContentValues toContentValues(){
		ContentValues cv = new ContentValues();
		^^toJava("cv")$$
		return cv;
	}
	public JSONObject toJSONObject() throws JSONException{
		JSONObject jo = new JSONObject();
		^^toJava("jo")$$
		return jo;
	}
	public static ^^=ucfirst(name)$$ generateTest(String fix){
		^^=ucfirst(name)$$ test = new ^^=ucfirst(name)$$();
^^fields.forEach(function(f){var type = dbdef.getType(f, "java");$$
	^^if(!f.auto){$$
			^^if(type == 'int' || type == 'long' || type == "double"){$$
		test.^^=f.name$$ = 1;
			^^}else if(type == 'String'){$$
		test.^^=f.name$$ = fix + "^^=f.name$$";
			^^}else if(type == 'boolean'){$$
		test.^^=f.name$$ = true;
			^^}else if(type == 'Date'){$$
		test.^^=f.name$$ = DateUtils.getNow();
			^^}else if(type == 'List<String>'){$$
		test.^^=f.name$$ = new ArrayList<String>();
			^^}$$
	^^}$$
^^})$$
		return test;
		
	}	
}
