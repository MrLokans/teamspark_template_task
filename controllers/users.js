var mongoose = require('mongoose');
var User = mongoose.model('User');


exports.login = function(req, res){
    res.render('../views/login');
};