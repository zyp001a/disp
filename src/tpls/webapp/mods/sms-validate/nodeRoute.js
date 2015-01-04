/*
body:
 phone
*/
router.route('/^^=name$$/sendSMS').post(^^=name$$Controller.sendSMS);
/*
body:
 phone
*/

router.route('/^^=name$$/sendSMSSignup').post(^^=name$$Controller.sendSMSSignup);
/*
body:
 phone
 code
*/
router.route('/^^=name$$/verifySMS').post(^^=name$$Controller.verifySMS);
