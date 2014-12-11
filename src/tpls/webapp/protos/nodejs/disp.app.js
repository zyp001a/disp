// Load required packages
var express = require('express');
var bodyParser = require('body-parser');

^^nodeControllers.forEach(function(ctrl){$$
var ^^=ctrl.name$$Controller = require('./controllers/^^=ctrl.name$$');
^^})$$

require('./dbconn');
// Create our Express application
var app = express();

// Use the body-parser package in our application
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

^^if(static){$$
app.use(express.static(__dirname + '/^^=static$$'));
^^}$$

//authentication/authorization module
var passport = require("passport");
// Use the passport package in our application
app.use(passport.initialize());


var router = express.Router();
// Create our Express router
^^nodeRoutes.forEach(function(route){$$
  ^^if(route.content){$$
^^=route.content$$
  ^^}$$
^^})$$

app.use('/api', router);


if(process.env.NODE_ENV != "test")
	app.set('port', ^^=port$$);
else
	app.set('port', ^^=test.port$$);



module.exports = app;
