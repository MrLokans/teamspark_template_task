var mongoose = require('mongoose');
var LocalStrategy = require('passport-local').Strategy;

var User = mongoose.model('User');


module.exports = new LocalStrategy({
        usernameField: 'email',
        passportField: 'password',
    },
    function(email, password, done){
        var options ={
            criteria: {email: email},
            select: 'name username email hashed_password salt'
        };
        User.load(options, function(err, user){
            if (err){
                return done(err);
            }
            if (!user){
                return done(null, false, {message: 'Unknownuser'});
            }
            if (!user.authenticate(password)){
                return done(null, false, {message: "Invlaid password"});
            }
            return done(null, user);
        });
    }
);