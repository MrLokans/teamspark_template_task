var express = require('express');
var router = express.Router();

//router.all('/')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/login', function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.render('login');
});

router.post('/login', function(req, res, next){
    console.log("attempted to login");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    var username = req.body.username;
    var password = req.body.password;
    console.log("User: " + username + ' attempted to login with password ' + password);
    res.render('index', { title: 'Express' });
});

router.get('/feed', function(req, res, next){
    res.render('feed');
});

router.get('/signup', function(req, res, next){
    res.render('signup');
});

router.post('/signup', function(req, res, next){
    // Registration
});

module.exports = router;
