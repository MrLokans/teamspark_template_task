var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
    author: {type: mongoose.Schema.Types.ObjectId,ref: 'User'},
    title: {type: String, default: ''},
    link: String,
    upvotes: {type: Number, default: 0},
    date: { type: Date, default: Date.now },
    comments: [{
        body: {type: String, default: ''},
        user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        date: {type: Date, default: Date.now }
    }]
});

PostSchema.methods = {
    addComment: function(user, comment, cb){
        this.comments.push({
            body: comment.body,
            user: user._id,
        });

        this.save(cb);
    },

    removeComment: function(commentId, cb){
        // think about removing the comment
    },

};

PostSchema.statics = {
    load: function(id, cb){
        this.findOne({ _id: id })
            .populate('user', 'name email username')
            .poluate('comments.user')
            .exec(cb);
    },

    list: function(options, cb){
        var criteria = options.criteria || {};

        this.find(criteria)
            .populate('user', 'name username')
            .sort({'date': -1})
            .exec(cb);
    }
};

mongoose.model('Post', PostSchema);