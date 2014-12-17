package com.^^=cop$$.^^=name.toLowerCase()$$.gen.dep;

public class ExceptionCode {

	public static ExceptionCode NullException = new ExceptionCode(0);
	public static int Null = 0;
	public static int DefaultException = 253;
	public static int DefaultMessage = 254;
	public static int Default = 255;

	public int code = 255;
	public Exception e;
	public String message;
	public int intResult;
	public String strResult;
	public Object res;
	public static ExceptionCode withResult(int i){
		ExceptionCode e = new ExceptionCode(0);
		e.intResult = i;
		return e;
	}
	public static ExceptionCode withResult(String str){
		ExceptionCode e = new ExceptionCode(0);
		e.strResult = str;
		return e;
	}
	public static ExceptionCode withResult(Object res){
		ExceptionCode e = new ExceptionCode(0);
		e.res = res;
		return e;
	}
	public ExceptionCode(Exception e){
		this.e = e;
		this.message = e.getMessage();
		this.code = ExceptionCode.DefaultException;
	}
	public ExceptionCode(int code, Exception e){
		this.e = e;
		this.message = e.getMessage();
		this.code = code;
	}
	public ExceptionCode(int code){
		this.code = code;
	}
	public ExceptionCode(int code, String message){
		this.message = message;
		this.code = code;
	}
	public ExceptionCode(String message){
		this.message = message;
		this.code = ExceptionCode.DefaultMessage;
	}
}
