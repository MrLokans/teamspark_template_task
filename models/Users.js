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
    username: {type: String, default: ''},
    usermail: {type: String, default: ''},
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
                .diget('hex');
        }catch (err){
            return '';
        }
    },

};

mongoose.model('User', UserSchema);