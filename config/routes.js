var users = require('../controllers/users');
var posts = require('../controllers/posts');
var comments = require('../controllers/comments');
var main = require('../controllers/main');


module.exports = function(app){
    app.get('/', main.index);
    app.get('/login', users.login);
    app.get('/signup', users.signup);
    app.get('/users', users.all);

    app.get('/post/:id', posts.details);
    // app.get('/logout', users.logout);
    // app.post('/users', users.create);

    // app.get('/users/:userId', users.show);

    // add OAUTH routes later

    // app.get('/posts/:id', posts.show);

    // handle main view
    // app.get('/', main.index);
    // app.post('/articles/:id/comments');

    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
      var err = new Error('Not Found');
      err.status = 404;
      next(err);
    });

    app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err
      });
    });
};
