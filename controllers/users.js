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