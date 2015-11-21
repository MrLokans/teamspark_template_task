var mongoose = require('mongoose');
var User = mongoose.model('User');


exports.login = function(req, res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.render('../views/login');
};