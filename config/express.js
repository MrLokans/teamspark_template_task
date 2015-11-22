var express = require('express');
var session = require('express-session');
var flash = require('connect-flash');
var cookieSession = require('cookie-session')

var mongoStore = require('connect-mongo')(session);
var path = require('path');

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var passport = require('passport');

var config = require('./config');
var pkg = require('../package.json');

module.exports = function(app, passport){
    app.set('views', path.join(__dirname, '..', 'views'));
    app.set('view engine', 'jade');
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(session({secret: 'SECRET'}));
    //app.use(cookieSession({ secret: 'secret' }));
    app.use(session({
        resave: true,
        saveUninitialized: true,
        secret: pkg.name,
        store: new mongoStore({
            url: config.db,
            collection : 'sessions'
        })
    }));
    app.use(passport.initialize());
    app.use(passport.session());

    // connect flash for flash messages - should be declared after sessions
    app.use(flash());
    app.use(express.static(path.join(__dirname, '..', 'public')));
};
