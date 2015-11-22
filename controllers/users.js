var mongoose = require('mongoose');
var User = mongoose.model('User');


exports.login = function(req, res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.render('login');
};

exports.signup = function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.render('signup');
};

exports.all = function(req, res, next){
    res.render('user_details', 
        {'users': [
            {'username': 'Anders', 'usermail': 't@t.t'}, 
            {'username': 'Anders2', 'usermail': 't@t.t'},
        ]
    }

);
};

exports.create = function (req, res) {
    console.log(req.body);
    const user = new User(req.body);

    user.provider = 'local';
    console.log("Trying to save the user");
    user.save(function (err) {
        if (err) {
            console.log('error during user save. ' + err);
            return res.redirect('users/signup');
        }

        // manually login the user once successfully signed up
        req.logIn(user, function (err) {
            if (err) {
                console.log('Could not authorise user ' + user.username + ' after save.');
                req.flash('info', 'Sorry! We are not able to log you in!');
            }
            return res.redirect('/');
        });
    });
};

exports.session = login;

/**
 * Login
 */

function login (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    console.log("Attempting logind, session :" + request.session);
    var redirectTo = req.session.returnTo
        ? req.session.returnTo
        : '/';
    delete req.session.returnTo;
    res.redirect(redirectTo);
}