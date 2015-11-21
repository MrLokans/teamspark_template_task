var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
LocalStrategy = require('passport-local').Strategy;

// var routes = require('./routes/index');
// var users = require('./routes/users');

var mongo = require('mongodb');
var mongoose = require('mongoose');



mongoose.connect('mongodb://localhost/twitter_clone');

require('./models/Users');
require('./models/Posts');
require('./models/Comments');

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({secret: 'SECRET'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
// if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
// }

// app.use('/', routes);
require('./config/routes')(app);

var User = mongoose.model('User');
var Post = mongoose.model('Post');
var Comment = mongoose.model('Comment');


var fillWithAuthors = function(){
  user = new User({username: "Andrew", usermail: "aaa@aaa.a", userpassword: "test"});
  user.save();
};

var fillWithPosts = function(){
  post = new Post({author: user._id, title: "Test Post", link:""});
  post.save();
};

var fillWithComments = function(){
  comment = new Comment({body: "Testing Comments", author: user._id, post:post.Id});
  comment.save();
};

// fillWithAuthors();
// fillWithPosts();
// fillWithComments();

console.log("Server is running on localhost:3000");
app.listen(3000);