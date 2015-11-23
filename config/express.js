var express = require('express');
var session = require('express-session');
var flash = require('connect-flash');

var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');

var mongoStore = require('connect-mongo')(session);
var path = require('path');

var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var passport = require('passport');

var config = require('./config');
var pkg = require('../package.json');

module.exports = function(app, passport){
    app.set('views', path.join(__dirname, '..', 'views'));
    app.set('view engine', 'jade');
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(methodOverride(function (req) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      var method = req.body._method;
      delete req.body._method;
      return method;
    }
  }));    

    app.use(cookieParser());
    app.use(cookieSession({secret: 'SECRET'}));
    //app.use(cookieSession({ secret: 'secret' }));

    app.use(passport.initialize());
    app.use(passport.session());

    // connect flash for flash messages - should be declared after sessions
    app.use(flash());

    app.use(session({
        resave: true,
        saveUninitialized: true,
        secret: pkg.name,
        store: new mongoStore({
            url: config.db,
            collection : 'sessions'
        })
    }));

    app.use(express.static(path.join(__dirname, '..', 'public')));
};
