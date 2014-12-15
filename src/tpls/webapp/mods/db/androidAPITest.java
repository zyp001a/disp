^^if(restful){$$

	public void testGet^^=ucfirst(name)$$() throws Exception{
		Context context = activity.getApplicationContext();


		^^if(fields[0].default == "autoinc"){$$
		String id = "1";
		^^}else{$$
		String id = "test^^=idField$$";
		^^}$$

		^^if(auth){$$
		^^=ucfirst(name)$$Utils.clear(context);
	  ^^=ucfirst(auth)$$Utils.save(^^=ucfirst(auth)$$Controller.getTestId(), ^^=ucfirst(auth)$$Controller.getTestToken(), context);
		^^}$$

		ExceptionCode e = API.get^^=ucfirst(name)$$(id, context);
		assertNull(e.message);
		assertEquals(0, e.code);

		^^if(fields[0].default == "autoinc"){$$
		assertEquals(1, ^^=ucfirst(name)$$Utils.get(id, context).^^=idField$$);
		^^}else{$$
		assertEquals(id, ^^=ucfirst(name)$$Utils.get(id, context).^^=idField$$);
		^^}$$

		return;
	}
	public void testPostAndDelete^^=ucfirst(name)$$() throws Exception{
		Context context = activity.getApplicationContext();
		^^if(auth){$$
		^^=ucfirst(name)$$Utils.clear(context);
	  ^^=ucfirst(auth)$$Utils.save(^^=ucfirst(auth)$$Controller.getTestId(), ^^=ucfirst(auth)$$Controller.getTestToken(), context);
		^^}$$
	  
		ExceptionCode e = API.post^^=ucfirst(name)$$(^^=ucfirst(name)$$.generateTest("atest"), context);
		assertNull(e.message);
		assertEquals(0, e.code);
		return;
	}

^^}$$
^^if(path){$$
			 ^^uploadApis.forEach(function(api){$$
						 ^^if(api.media == "image"){$$

	public void testUpload^^=ucfirst(api.name)$$() throws Exception{
		Context context = activity.getApplicationContext();
		Bitmap bitmap = ImageUtils.drawableToBitmap(context.getResources().getDrawable(R.drawable.ic_launcher));

		^^if(auth){$$
		^^=ucfirst(name)$$Utils.clear(context);
	  ^^=ucfirst(auth)$$Utils.save(^^=ucfirst(auth)$$Controller.getTestId(), ^^=ucfirst(auth)$$Controller.getTestToken(), context);
		^^}$$

		ExceptionCode e = API.upload^^=ucfirst(api.name)$$(bitmap, context);
		assertNull(e.message);

		return;
	}


						 ^^}$$
									^^})$$
^^}$$
