// Load required packages
var express = require('express');
var bodyParser = require('body-parser');

^^nodeControllers.forEach(function(ctrl){$$
var ^^=ctrl.name$$Controller = require('./controllers/^^=ctrl.name$$');
^^})$$

^^if(mongodb){$$
var mongoose = require("mongoose");
mongoose.connect('mongodb://^^=mongodb.path$$');
^^}$$

// Create our Express application
var app = express();

// Use the body-parser package in our application
app.use(bodyParser.urlencoded({
  extended: true
}));

^^if(auth){$$
//authentication/authorization module
var passport = require("passport");
// Use the passport package in our application
app.use(passport.initialize());
^^}$$

// Create our Express router
var router = express.Router();

/*
// Create endpoint handlers for /beers
router.route('/beers')
  .post(authController.isAuthenticated, beerController.postBeers)
  .get(authController.isAuthenticated, beerController.getBeers);

// Create endpoint handlers for /beers/:beer_id
router.route('/beers/:beer_id')
  .get(authController.isAuthenticated, beerController.getBeer)
  .put(authController.isAuthenticated, beerController.putBeer)
  .delete(authController.isAuthenticated, beerController.deleteBeer);

// Create endpoint handlers for /users
router.route('/users')
  .post(userController.postUsers)
  .get(authController.isAuthenticated, userController.getUsers);

// Register all our routes with /api
app.use('/api', router);
*/
// Start the server
app.listen(^^=port$$, function(err){
	if(!err)
		console.log("listen to port ^^=port$$");
});
