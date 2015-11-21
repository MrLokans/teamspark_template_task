var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
    author: {type: mongoose.Schema.Types.ObjectId,ref: 'User'},
    title: String,
    link: String,
    upvotes: {type: Number, default: 0},
    date: { type: Date, default: Date.now },
    comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}]
});

mongoose.model('Post', PostSchema);