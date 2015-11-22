var mongoose = require('mongoose');
var User = mongoose.model('User');
var Post = mongoose.model('Post');


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

exports.create = function(req, res, next){
    console.log("Request with post creation");
    var post = new Post(req.body);
    post.user = req.user;
    post.save();
    res.json({"status": "created succsessfully"});
};