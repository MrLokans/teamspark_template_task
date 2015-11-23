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
            select: 'username email hashed_password salt'
        };
        User.load(options, function(err, user){
            if (err){
                console.log('auth error');
                return done(err);
            }
            if (!user){
                console.log('user '  + email + ' is not present in system');
                return done(null, false, {message: 'Unknown user'});
            }
            if (!user.authenticate(password)){
                console.log('user '  + email + ' supplid incorrect password');
                return done(null, false, {message: "Invalid password"});
            }
            return done(null, user);
        });
    }
);