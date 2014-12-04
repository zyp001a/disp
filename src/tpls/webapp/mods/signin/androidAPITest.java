	public void testSignin() throws Exception{
	
		Context context = activity.getApplicationContext();
		JSONObject jo = new JSONObject();
		jo.put("username", "admin");
		jo.put("token", "");
		UsersUtils.saveToken(jo, context);
		ExceptionCode e = API.signin("admin", "admin", context);
		assertEquals(0, e.code);
		assertTrue(!TextUtils.isEmpty(UsersUtils.getToken(context)));

		return;
	}
