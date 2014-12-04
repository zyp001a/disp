package com.^^=cop$$.^^=name.toLowerCase()$$.dep;

public class ExceptionCode {
	public static ExceptionCode NullException = new ExceptionCode(0);
	public int code = 255;
	public Exception e;
	public String message;
	public ExceptionCode(Exception e){
		this.e = e;
		this.message = e.getMessage();
		this.code = 100;
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
		this.code = 101;
	}
}
