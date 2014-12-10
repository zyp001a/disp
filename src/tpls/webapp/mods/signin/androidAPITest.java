	public void testSignin() throws Exception{
	
		Context context = activity.getApplicationContext();
		^^if(schema.fields[0].default == "autoinc"){$$
		String id = "1";
		^^}else{$$
		String id = "test^^=idField$$";
		^^}$$

		^^=ucfirst(auth)$$Utils.save(id, "", context);

		ExceptionCode e = API.^^=name$$("testphone", "testpassword", context);
		assertNull(e.message);
		assertTrue(!TextUtils.isEmpty(^^=ucfirst(auth)$$Utils.getToken(context)));

		return;
	}
