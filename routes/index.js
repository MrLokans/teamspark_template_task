var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var router = express.Router();

//router.all('/')

passport.use(new LocalStrategy(
  function(username, password, done){
    
  })
);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', function(req, res, next){
    console.log("attempted to login");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    var username = req.body.username;
    var password = req.body.password;

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
