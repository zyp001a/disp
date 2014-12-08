^^if(restful){$$
router.route('/^^=name$$').post(^^=auth$$Controller.authMidware, 
														^^=name$$Controller.post);
 ^^if(idField){$$
router.route('/^^=name$$/:id').get(^^=auth$$Controller.authMidware, 
															 ^^=name$$Controller.get);
router.route('/^^=name$$/:id').put(^^=auth$$Controller.authMidware, 
															 ^^=name$$Controller.put);
router.route('/^^=name$$/:id').delete(^^=auth$$Controller.authMidware, 
																	^^=name$$Controller.delete);
 ^^}$$
^^}$$
^^apis.forEach(function(api){$$
 ^^if(api.type == "getList"){$$
router.route('/^^=api.name$$').get(^^=auth$$Controller.authMidware, 
																	 ^^=name$$Controller.^^=api.name$$);
 ^^}else if(api.type == "post"){$$
router.route('/^^=api.name$$').post(^^=auth$$Controller.authMidware, 
																						 ^^=name$$Controller.^^=api.name$$);
 ^^}else if(idField){$$
router.route('/^^=api.name$$/:id').^^=api.type$$(^^=auth$$Controller.authMidware, 
																						 ^^=name$$Controller.^^=api.name$$);
 ^^}$$
^^})$$
