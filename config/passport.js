'use esnext';

var mongoose = require('mongoose');
var user = mongoose.model('User');

var local = require('./passport/local');

module.exports = function(passport){
    passport.serializeUser((user, cb) => cb(null, user.id));
    passport.deserializeUser((id, cb) => User.load({ criteria: { _id: id } }, cb));

    passport.use(local);
};