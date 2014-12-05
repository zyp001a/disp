
package com.^^=cop$$.^^=name.toLowerCase()$$.test.api;
import org.json.JSONObject;

import com.^^=cop$$.^^=name.toLowerCase()$$.api.API;
import com.^^=cop$$.^^=name.toLowerCase()$$.dep.ExceptionCode;
import com.^^=cop$$.^^=name.toLowerCase()$$.test.TestActivity;

^^androidProviders.forEach(function(pr){$$
import com.^^=cop$$.^^=name.toLowerCase()$$.provider.^^=ucfirst(pr.name)$$Utils;
^^})$$


import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.test.ActivityUnitTestCase;
import android.text.TextUtils;


public class APITest extends ActivityUnitTestCase<TestActivity>{

	public APITest() {
		super(TestActivity.class);
	}
	private Activity activity; 
	@Override
		protected void setUp() throws Exception {
		super.setUp();
		startActivity(new Intent(), null, null);
		activity = getActivity();
	}
	@Override
		protected void tearDown() throws Exception {
	}
	
	^^androidAPITests.forEach(function(at){$$
^^=at.content$$
	^^})$$
}
 
