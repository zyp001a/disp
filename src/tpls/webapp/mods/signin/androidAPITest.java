	public void testSignin() throws Exception{
	
		Context context = activity.getApplicationContext();

		^^=ucfirst(auth)$$Utils.save("admin", "", context);

		ExceptionCode e = API.signin("admin", "admin", context);
		assertEquals(0, e.code);
		assertTrue(!TextUtils.isEmpty(^^=ucfirst(auth)$$Utils.getToken(context)));

		return;
	}
