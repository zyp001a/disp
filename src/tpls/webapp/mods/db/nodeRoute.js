^^if(restful){$$
router.route('/^^=name$$').post(^^=auth$$Controller.authMidware, 
														^^=name$$Controller.post);
router.route('/^^=name$$/:id').get(^^=auth$$Controller.authMidware, 
															 ^^=name$$Controller.get);
router.route('/^^=name$$/:id').put(^^=auth$$Controller.authMidware, 
															 ^^=name$$Controller.put);
router.route('/^^=name$$/:id').delete(^^=auth$$Controller.authMidware, 
																	^^=name$$Controller.delete);
^^}$$


^^apis.forEach(function(api){$$
 ^^if(api.type == "gets"){$$
  ^^if(!api.by){$$
router.route('/^^=api.name$$').get(^^=auth$$Controller.authMidware, ^^=name$$Controller.^^=api.name$$);
  ^^}else{$$
router.route('/^^=api.name$$/:^^=api.by$$').get(^^=auth$$Controller.authMidware, ^^=name$$Controller.^^=api.name$$);
  ^^}$$
 ^^}else if(api.type == "post"){$$
router.route('/^^=api.name$$').post(^^=auth$$Controller.authMidware, ^^=name$$Controller.^^=api.name$$);
 ^^}else {$$
router.route('/^^=api.name$$/:id').^^=api.type$$(^^=auth$$Controller.authMidware, ^^=name$$Controller.^^=api.name$$);
 ^^}$$
^^})$$

^^if(path){$$
var mkdirp = require("mkdirp");
var multipart = require('connect-multiparty');

 ^^uploadApis.forEach(function(api){$$
  ^^var apipath = name + "/"+api.name;$$
mkdirp.sync("^^=path$$/^^=apipath$$/");
router.route('/^^=apipath$$/:id')
			.post(^^=auth$$Controller.authMidware,
						multipart({uploadDir: "^^=path$$/^^=apipath$$/"}),
            ^^=name$$Controller.upload^^=ucfirst(api.name)$$);
router.route('/^^=apipath$$/:filename')
			.get(^^=auth$$Controller.authMidware,
					^^=name$$Controller.download^^=ucfirst(api.name)$$);
 ^^})$$
^^}$$
