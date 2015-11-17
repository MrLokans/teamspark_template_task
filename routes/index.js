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

    var db = req.db;
    var collection = db.get('users');

    // TODO: add unsafe user data filtering
    // TODO: investigate and use passport.js for auth routines
    collection.find({'username': username, 'user_passwd_hash': password}, function(err, data){
        if(err){
            console.log(err);
        } else {
            if (data.length === 0){
                console.log("Invalid creadentials for user " + username);
            } else{
                data = JSON.stringify(data);
                console.log("Something's found: " + data);
            }
        }
    });
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
