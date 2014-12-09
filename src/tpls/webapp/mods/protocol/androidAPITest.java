^^if(restful){$$
 ^^if(idField){$$
	public void testGet^^=ucfirst(name)$$() throws Exception{
		Context context = activity.getApplicationContext();
		^^=ucfirst(name)$$Utils.clear(context);

		^^if(fields[0].default == "autoinc"){$$
		String id = "1";
		^^}else{$$
		String id = "test^^=idField$$";
		^^}$$

		^^if(auth){$$
		^^=ucfirst(auth)$$Utils.save(id, "testtoken", context);
		^^}$$

		ExceptionCode e = API.get^^=ucfirst(name)$$(id, context);
		assertNull(e.message);
		assertTrue(!TextUtils.isEmpty(^^=ucfirst(name)$$Utils.get(id, context).^^=idField$$));

		return;
	}
 ^^}$$
^^}$$
