/**
 * Created by amilamanoj on 5/25/16.
 */
var Config = require('./config/config.js');

/**
 * db connect
 */

var mongoose = require('mongoose');
mongoose.connect([Config.db.host, '/', Config.db.name].join(''),{
    //eventually it's a good idea to make this secure
    user: Config.db.user,
    pass: Config.db.pass
});

/**
 * create application
 */

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

var app = express();

/**
 * app setup
 */

app.use(cors());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true
}));


//passport

var passport = require('passport');
var jwtConfig = require('./passport/jwtConfig');

app.use(passport.initialize());
jwtConfig(passport);


/**
 * routing
 */

var userRoutes = require("./user/userRoutes");
var projectRoutes = require("./project/projectRoutes");
var applicationRoutes = require("./application/applicationRoutes");

app.use('/api', projectRoutes(passport));
app.use('/api', applicationRoutes(passport));
app.use('/', userRoutes(passport));


module.exports = app;