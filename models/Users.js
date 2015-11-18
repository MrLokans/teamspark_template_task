var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    _id: Number,
    username: String,
    usermail: String,
    userpassword: String,
    posts: [{type: mongoose.Schema.Types.ObjectID, ref: 'Post'}],
    comments: [{type: mongoose.Schema.Types.ObjectID, ref: 'Comment'}]
});

UserSchema.methods.isValidPassword = function(password){
    return true;
};

mongoose.model('User', PostSchema);


