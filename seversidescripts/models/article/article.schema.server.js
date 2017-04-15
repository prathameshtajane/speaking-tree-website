var mongoose = require('mongoose');
var ArticleSchema = mongoose.Schema({
    "bookisbn": String,
    "authorid": String,
    "authorusername":String,
    "articletitle": String,
    "articlecontent": String,
    "userlikeids":[],
    "userdislikeids":[],
    "dateCreated": { type: Date, default: Date.now }
}, {collection: 'article'});
module.exports = ArticleSchema;

