var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');

// var routes = require('./routes/index');
// var users = require('./routes/users');

var mongo = require('mongodb');
var mongoose = require('mongoose');

var app = express();


mongoose.connect('mongodb://localhost/twitter_clone');

require('./models/Users');
require('./models/Posts');
require('./models/Comments');

require('./config/passport')(passport);
require('./config/express')(app);
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