	public void testSignin() throws Exception{
	
		Context context = activity.getApplicationContext();
		JSONObject jo = new JSONObject();
		jo.put("username", "admin");
		jo.put("token", "");
		^^=ucfirst(auth)$$Utils.save(jo, context);
		ExceptionCode e = API.signin("admin", "admin", context);
		assertEquals(0, e.code);
		assertTrue(!TextUtils.isEmpty(^^=ucfirst(auth)$$Utils.getToken(context)));

		return;
	}
