var users = require('../controllers/users');
var posts = require('../controllers/posts');
var comments = require('../controllers/comments');
var main = require('../controllers/main');


module.exports = function(app){
    app.get('/login', users.login);
    // app.get('/signup', users.signup);
    // app.get('/logout', users.logout);
    // app.post('/users', users.create);

    // app.get('/users/:userId', users.show);

    // add OAUTH routes later

    // app.get('/posts/:id', posts.show);

    // handle main view
    app.get('/', main.index);
    // app.post('/articles/:id/comments')
};
