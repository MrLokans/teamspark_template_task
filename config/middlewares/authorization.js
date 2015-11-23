exports.requiresLogin = function(req, res, next){
    if (req.isAuthenticated()){
        console.log("User SUCCESSFULY authenticated.");
        return next();
    }
    console.log("User is not authenticated.");
    if (req.method == 'GET'){
        req.session.returnTo = req.originalUrl;
    }
    res.redirect('/login');
};

exports.user = {
    hasAuthorization: function(req, res, next){
        if (req.profile.id != req.user.id){
            req.flash('info', 'You are not authorized');
            return res.redirect('/users/' + req.profile.id);
        }
        next();
    }
};

exports.post = {
    hasAuthorization: function(req, res, next){
        if (req.post.user.id != req.user.id){
            req.flash('info', 'You are not authorized');
            return res.redirect('/posts/' + req.post.id);
        }
        next();
    }
};

exports.comment = {
    hasAuthorization: function(req, res, next){
        if (req.user.id === req.comment.user.id || req.user.id === req.post.user.id){
            next();
        } else {
            req.flash('info', 'You are not authorized');
            res.redirect('/posts/' + req.post.id);
        }
    }
};