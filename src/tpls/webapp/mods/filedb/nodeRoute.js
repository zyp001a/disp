router.route('/^^=name$$')
	.get(^^if(auth){$$^^=auth$$Controller.authMidware, ^^}$$
	^^=name$$Controller.get)
	.put(^^if(auth){$$^^=auth$$Controller.authMidware, ^^}$$
	^^=name$$Controller.put);
