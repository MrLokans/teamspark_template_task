var mongoose = require('mongoose');
var crypto = require('crypto');

var Schema = mongoose.Schema;

var oAuthProviders = [
    'github',
    'facebook',
    'google',
    'linkedin'
];

var UserSchema = new Schema({
    // _id: Number,
    //name: {type: String, default: ''},
    username: {type: String, default: ''},
    email: {type: String, default: ''},
    hashed_password: {type: String, default: ''},
    salt: {type: String, default: ''},
    posts: [{type: Schema.Types.ObjectId, ref: 'Post'}],
    comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}],
    provider: {type: String, default: ''},
    authToken : {type: String, default: ''},
    github: {},
    facebook: {},
    google: {},
    linkedin: {},
});

UserSchema
    .virtual('password')
    .set(function(password){
        this._password = password;
        this.salt = this.generateSalt();
        this.hashed_password = this.encryptPassword(password);
    })
    .get(function(){
        return this._password;
    });

// validations

UserSchema.path('username').validate(function(name){
    return name.length;
}, 'Name cannot be blank');

UserSchema.path('email').validate(function(email){
    return email.length;
}, 'Email cannot be blank');

UserSchema.path('email').validate(function(email, func){
    // func called with 'true' or 'false' means the status of validation
    console.log('validating user with email: ' + email);
    var User = mongoose.model('User');

    if (this.isNew || this.isModified('email')){
        User.find({email: email}).exec(function(err, users){
            if (err){
                console.log(err);
            }
            console.log("users len: " + users.length);
            console.log("err: " + !!err);
            console.log("Status: " + (!err && users.length === 0))
            func(!err && users.length === 0);
        });
    } else {
        console.log(this.isNew);
        console.log(this.isModified('email'));
        func(true);
    };
}, 'Email already exists');


UserSchema.path('username').validate(function(username){
    console.log('validating user with username: ' + username);
    return username.length;
}, 'Username cannot be blank');

UserSchema.path('hashed_password').validate(function(hashed_password){
    console.log('validating user\'s password');
    return hashed_password.length && this._password.length;
}, 'Password cannot be blank');


//UserSchema.pre('save', function (next) {
//    if (!this.isNew) return next();
//
//    if (!validatePresenceOf(this.password)) {
//        next(new Error('Invalid password'));
//    } else {
//        next();
//    }
//});


UserSchema.methods = {
    authenticate: function(plainText){
        return this.encryptPassword(plainText) == this.hashed_password;
    },
    generateSalt: function(){
        return Math.round( (new Date().valueOf() * Math.random()) ) + '';
    },
    encryptPassword: function(password){
        if (!password){
            return '';
        }
        try{
            encryptedPass = crypto
                .createHmac('sha512', this.salt)
                .update(password)
                .digest('hex');
        }catch (err){
            return '';
        }
    },

};

// find single user via criteria, extract selected field and call func
UserSchema.statics = {
    load: function(options, cb){
        options.select = options.select || 'name username';
        this.findOne(options.criteria)
            .select(options.select)
            .exec(cb);
    }
};

mongoose.model('User', UserSchema);