'use strict';

var mongoose = require('mongoose');
var User = mongoose.model('User');

var local = require('./passport/local');

module.exports = function(passport){
    passport.serializeUser(function(user, cb){
        return cb(null, user.id);
    });
    passport.deserializeUser(function(id, cb){
        return User.load({ criteria: { _id: id } }, cb);
    });

    passport.use(local);
};