var mongoose = require('mongoose');
var BookSchema = mongoose.Schema({
    "bookname": String,
    "isbn": String,
    "authorname": String,
    "imgurl": String,
    "reviewsub": String,
    "review": String,
    "reviewerid":String,
    "reviewername":String,
    /*reviewerid: [{reviewerid:{type: mongoose.Schema.Types.ObjectId, ref: 'userModel'}}],*/
    "dateCreated": { type: Date, default: Date.now }
}, {collection: 'book'});
module.exports = BookSchema;

