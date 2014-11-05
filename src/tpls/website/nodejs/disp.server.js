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
app.use(bodyParser.json());


^^if(auth){$$
//authentication/authorization module
var passport = require("passport");
// Use the passport package in our application
app.use(passport.initialize());
^^}$$

var router = express.Router();
// Create our Express router
^^nodeRoutes.forEach(function(route){$$

  ^^if(route.content){$$
^^=route.content$$
  ^^} else {$$
router.route('/^^=route.name$$').^^=route.type$$(^^if(route.auth){$$^^=route.auth$$Controller.authMidware, ^^}$$^^=route.method$$);
	^^}$$
/*
app.^^=route.type$$("/^^=route.name$$", ^^if(route.auth){$$^^=route.auth$$Controller.isAuthenticated, ^^}$$^^=route.method$$);
*/
^^})$$

app.use('/api', router);


// Start the server
app.listen(^^=port$$, function(err){
	if(!err)
		console.log("listen to port ^^=port$$");
});