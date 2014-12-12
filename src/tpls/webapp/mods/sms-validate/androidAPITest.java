
	public void test^^=ucfirst(name)$$() throws Exception{
	
		Context context = activity.getApplicationContext();
		//use ^^=name$$SendSMS for production purpose
		ExceptionCode e = API.^^=name$$SendSMSPseudo("123457", context);
				
		assertNull(e.message);
		API.^^=name$$VerifySMS("123457", e.strResult, context);
		assertNull(e.message);
		return;
	}

