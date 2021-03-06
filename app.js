var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var config = require('./config/config');
// var routes = require('./routes/index');
// var users = require('./routes/users');

var mongo = require('mongodb');
var mongoose = require('mongoose');

var app = express();

module.exports = app;

mongoose.connection.on('error', console.log);
mongoose.connection.on('disconnected', connect);
connect();

//mongoose.connect('mongodb://localhost/twitter_clone');

require('./models/Users');
require('./models/Posts');

require('./config/passport')(passport);
require('./config/express')(app, passport);
require('./config/routes')(app, passport);

var User = mongoose.model('User');
var Post = mongoose.model('Post');


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

// Connect to mongodb
function connect () {
  console.log('Connecting to monogo db: '+ config.db);
  var options = { server: { socketOptions: { keepAlive: 1 } } };
  mongoose.connect(config.db, options);
}