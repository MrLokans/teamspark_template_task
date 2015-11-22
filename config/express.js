var express = require('express');
var session = require('express-session');

var path = require('path');

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var passport = require('passport');

module.exports = function(app, passport){
    app.set('views', path.join(__dirname, '..', 'views'));
    app.set('view engine', 'jade');
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(session({secret: 'SECRET'}));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(express.static(path.join(__dirname, '..', 'public')));
};
