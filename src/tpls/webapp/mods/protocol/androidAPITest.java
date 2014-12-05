^^if(restful){$$
	public void testGet^^=ucfirst(name)$$() throws Exception{
		Context context = activity.getApplicationContext();
		^^if(auth){$$
		^^=ucfirst(auth)$$Utils.save("admin", "admin", context);
		^^}$$

		^^=ucfirst(name)$$Utils.clear(context);
		ExceptionCode e = API.get^^=ucfirst(name)$$("test^^=idField$$", context);
		assertNull(e.message);
		assertTrue(!TextUtils.isEmpty(^^=ucfirst(name)$$Utils.get("test^^=idField$$", context).^^=idField$$));

		return;
	}
^^}$$
