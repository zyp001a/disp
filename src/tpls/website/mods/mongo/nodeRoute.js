^^if(restful){$$
router.route('/users').post(^^=auth$$Controller.authMidware, 
														^^=name$$Controller.post);
router.route('/users/:id').get(^^=auth$$Controller.authMidware, 
															 ^^=name$$Controller.get);
router.route('/users/:id').put(^^=auth$$Controller.authMidware, 
															 ^^=name$$Controller.put);
router.route('/users/:id').delete(^^=auth$$Controller.authMidware, 
																	^^=name$$Controller.delete);

^^}$$
^^apis.forEach(function(api){$$
 ^^if(api.type == "getList"){$$
router.route('/^^=api.name$$').get(^^=auth$$Controller.authMidware, 
																	 ^^=name$$Controller.^^=api.name$$);
 ^^}else {$$
router.route('/^^=api.name$$').^^=api.type$$(^^=auth$$Controller.authMidware, 
																						 ^^=name$$Controller.^^=api.name$$);
 ^^}$$
^^})$$
