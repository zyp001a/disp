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
^^if(path){$$
			 ^^uploadApis.forEach(function(api){$$
						 ^^if(api.media == "image"){$$

	 public void testUpload^^=ucfirst(api.name)$$() throws Exception{
		Context context = activity.getApplicationContext();
		LoanUtils.clear(context);
		Bitmap bitmap = ImageUtils.drawableToBitmap(context.getResources().getDrawable(R.drawable.ic_launcher));
		String id = "1";
		NormalAuthUtils.save(id, "testtoken", context);
		ExceptionCode e = API.upload^^=ucfirst(api.name)$$(bitmap, context);
		assertNull(e.message);

		return;
	}


						 ^^}$$
									^^})$$
^^}$$
