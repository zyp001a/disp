
router.route("/^^=name$$/^^=signin$$").post(^^=name$$Controller.signin);
^^if(!noSignup){$$
router.route("/^^=name$$/^^=signup$$").post(^^=name$$Controller.signup);
^^}$$

^^schema.fields.forEach(function(f){$$
 ^^if(f.encrypt){$$
router.route("/^^=name$$/verifyId^^=ucfirst(f.name)$$").post(^^=name$$Controller.verifyId^^=ucfirst(f.name)$$);
 ^^}$$
^^})$$
