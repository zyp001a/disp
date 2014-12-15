package com.^^=ns$$.gen.model;

import org.json.JSONException;
import org.json.JSONObject;
import java.util.Date;
import android.text.TextUtils;
import com.JAC.stubank.gen.dep.DateUtils;

public class ^^=ucfirst(name)$$ {
	public static ^^=ucfirst(name)$$ Empty^^=ucfirst(name)$$ = new ^^=ucfirst(name)$$();
^^fields.forEach(function(f){$$
	public ^^=dbdef.getType(f, "java")$$ ^^=f.name$$;
^^})$$
	public ^^=ucfirst(name)$$(){
	}
	public boolean isNull(){
		^^var type = dbdef.getType(fields[0], "basic");$$
		^^if(type == "string"){$$				 
			return TextUtils.isEmpty(^^=idField$$);
		^^}else{$$
			return ^^=idField$$ != 0;
		^^}$$		
	}
	public JSONObject toJSONObjectFull() throws JSONException{
		JSONObject jo = new JSONObject();
^^fields.forEach(function(f){var type = dbdef.getType(f, "java");$$
			^^if(!f.auto){$$
			 ^^if(type != 'Date'){$$
		jo.put("^^=f.name$$", ^^=f.name$$);
			 ^^}else{$$
		jo.put("^^=f.name$$", DateUtils.getString(^^=f.name$$));
			 ^^}$$
			^^}$$
^^})$$
		return jo;
	}
	public JSONObject toJSONObject() throws JSONException{
		JSONObject jo = new JSONObject();
^^fields.forEach(function(f){var type = dbdef.getType(f, "java");$$
	^^if(!f.auto){$$
			^^if(type == 'int' || type == 'long' || type == "double"){$$
		if(^^=f.name$$>0){					
			jo.put("^^=f.name$$", ^^=f.name$$);
		}
			^^}else if(type == 'String'){$$
		if(!TextUtils.isEmpty(^^=f.name$$)){					
			jo.put("^^=f.name$$", ^^=f.name$$);
		}
			^^}else if(type == 'boolean'){$$
		if(^^=f.name$$){
			jo.put("^^=f.name$$", ^^=f.name$$);
		}
			^^}else if(type == 'Date'){$$
		if(^^=f.name$$ != null){
			jo.put("^^=f.name$$", DateUtils.getString(^^=f.name$$));
		}
			^^}$$
	^^}$$
^^})$$
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
			^^}$$
	^^}$$
^^})$$
		return test;
		
	}	
}
