^^if(restful){$$
^^var authMid = function(){if(auth){$$
^^=auth$$Controller.authMidware, 
^^}}$$

router.route('/^^=name$$').post(^^authMid()$$^^=name$$Controller.post);
router.route('/^^=name$$/:id').get(^^authMid()$$^^=name$$Controller.get);
router.route('/^^=name$$/:id').put(^^authMid()$$^^=name$$Controller.put);
router.route('/^^=name$$/:id').delete(^^authMid()$$^^=name$$Controller.delete);
^^}$$


^^apis.forEach(function(api){if(!api.noRoute){$$
^^var authMid = function(){if(auth && !api.noAuth){$$
^^=auth$$Controller.authMidware, 
^^}}$$

 ^^if(api.type == "gets"){$$
  ^^if(!api.by){$$
router.route('/^^=api.name$$').get(^^authMid()$$^^=name$$Controller.^^=api.name$$);
  ^^}else{$$
router.route('/^^=api.name$$/:^^=api.by$$').get(^^authMid()$$^^=name$$Controller.^^=api.name$$);
  ^^}$$
 ^^}else if(api.type == "post"){$$
router.route('/^^=api.name$$').post(^^authMid()$$^^=name$$Controller.^^=api.name$$);
 ^^}else {$$
/*
body:
 
*/
router.route('/^^=api.name$$/:id').^^=api.type$$(^^authMid()$$^^=name$$Controller.^^=api.name$$);
 ^^}$$
^^}})$$

^^if(path){$$
var mkdirp = require("mkdirp");
var multipart = require('connect-multiparty');
var path = require("path");
 ^^uploadApis.forEach(function(api){$$
  ^^var apipath = name + "/"+api.name;$$
/*
body: (multipart)
 buffer
*/
mkdirp.sync(path.resolve("^^=path$$/^^=apipath$$/"));
router.route('/^^=apipath$$/:id')
			.post(^^=auth$$Controller.authMidware,
						multipart({uploadDir: path.resolve("^^=path$$/^^=apipath$$/")}),
            ^^=name$$Controller.upload^^=ucfirst(api.name)$$);
router.route('/^^=apipath$$/:filename')
			.get(^^=auth$$Controller.authMidware,
					^^=name$$Controller.download^^=ucfirst(api.name)$$);
 ^^})$$
^^}$$
