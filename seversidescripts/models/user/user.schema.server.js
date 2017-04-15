var mongoose = require('mongoose');
var UserSchema = mongoose.Schema({
    "username": String,
    "password": String,
    "firstName": String,
    "lastName": String,
    "email": String,
    "phone": String,
    /*websites: [{websiteid:{type: mongoose.Schema.Types.ObjectId, ref: 'websiteModel'}}],*/
    "followers":[],
    "following":[],
    "books":[],
    "role":{type: String,enum:['Reader','Author','Admin']},
    "dateCreated": Date
}, {collection: 'user'});
module.exports = UserSchema;
