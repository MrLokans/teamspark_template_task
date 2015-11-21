var mongoose = require('mongoose');
var User = mongoose.model('User');


exports.login = function(req, res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.render('login');
};

exports.signup = function(req, res, next){
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