var mongoose = require('mongoose');
var User = mongoose.model('User');
var Post = mongoose.model('Post');
var wrap = require('co-express');
var only = require('only');

exports.listmy = function(req, res, next){
    console.log("User requested post data: " + req.user);
    var posts = Post.list({}, function(err, posts){
        if (err){
            console.log(err);
        }
        res.render('my_posts', {posts: posts});
    });
    // console.log("Posts after query: " + posts);
    
};

exports.details = function(req, res, next){
    console.log('Requesting post with id ' + req.params.id);

    example_post_data = {
        'post': {
            author: "Example user",
            time: 'now',
            text: "Some baisc text to be displayed",
            comments: [
                {'author': 'Another user', 'text': 'Here comes comment!'},
                {'author': 'Another user 2', 'text': 'Here comes another comment!'},

                ]
        }
    };
    res.render('post', example_post_data);
};

exports.create = wrap(function (req, res, next){
    console.log("Request with post creation");
    var post = new Post(only(req.body, 'title body'));
    console.log("Request user: " + req.user);
    post.author = req.user;
    console.log("Post to be saved: " + post);
    post.save(function(err){
        if (err){
            console.log("Error, while post saving: " + err);
        }
        console.log("Saved post!");
    });
    res.json({"status": "created succsessfully"});
});