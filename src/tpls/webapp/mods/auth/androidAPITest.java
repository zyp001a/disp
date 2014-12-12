	public void test^^=ucfirst(name)+ucfirst(signin)$$() throws Exception{
	
		Context context = activity.getApplicationContext();
		^^if(schema.fields[0].default == "autoinc"){$$
		String id = "1";
		^^}else{$$
		String id = "test^^=idField$$";
		^^}$$
		^^=ucfirst(name)$$Utils.save(id, "", context);
		ExceptionCode e = API.^^=name+ucfirst(signin)$$("testphone", "testpassword", context);
		assertNull(e.message);
		assertTrue(!TextUtils.isEmpty(^^=ucfirst(name)$$Utils.getToken(context)));

		return;
	}
^^if(!codeDb){$$
	public void test^^=ucfirst(name)+ucfirst(signup)$$() throws Exception{
	
		Context context = activity.getApplicationContext();
		^^if(schema.fields[0].default == "autoinc"){$$
		String id = "1";
		^^}else{$$
		String id = "test^^=idField$$";
		^^}$$
		^^=ucfirst(name)$$Utils.save(id, "", context);
		ExceptionCode e = API.^^=name+ucfirst(signup)$$("testphone2", "testpassword2", "testcode", context);
		assertNull(e.message);
		assertTrue(!TextUtils.isEmpty(^^=ucfirst(name)$$Utils.getToken(context)));

		return;
	}
^^}$$
