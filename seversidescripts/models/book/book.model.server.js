module.exports=function (app,mongoose) {
    var q = require('q');

    var bookSchema=require('../book/book.schema.server');
    var bookModel=mongoose.model('bookModel',bookSchema);

    var api={
        addBookReviewByBookISBN:addBookReviewByBookISBN,
        findBookReviewByReadersList:findBookReviewByReadersList,
        findBookReviewByReaderId:findBookReviewByReaderId,
        findBookReviewByBookISBN:findBookReviewByBookISBN,
        findBookReviewsByReviewerNameList:findBookReviewsByReviewerNameList,
        findAllBookReviews:findAllBookReviews,
        deleteBookReviewByReviewId:deleteBookReviewByReviewId
    };
    return api;

    function deleteBookReviewByReviewId(reviewid) {
        var deferred = q.defer();
        console.log("deleteBookReviewByReviewId from book.model.server");
        console.log(reviewid);
        bookModel.remove({"_id":reviewid},function (err,status){
            if(err){
                deferred.reject(new Error(err));
            }else{
                deferred.resolve(status);
            }
        });
        return deferred.promise;
    }

    function findAllBookReviews() {
        var deferred = q.defer();
        console.log("findAllBookReviews from book.model.server");
        bookModel.find({},function (err,status) {
            if(err){
                deferred.reject(new Error(err));
            }else{
                deferred.resolve(status);
            }
        });
        return deferred.promise;
    }

    function findBookReviewsByReviewerNameList(usernamelist){
        var deferred = q.defer();
        console.log("findBookReviewsByReviewerNameList from book.model.server");
        console.log(usernamelist);
        bookModel.find({ "reviewername": { $in: usernamelist }},function (err,status) {
            if(err){
                deferred.reject(new Error(err));
            }else{
                deferred.resolve(status);
            }
        });
        return deferred.promise;
    }

    function addBookReviewByBookISBN(newBookReview) {
        var deferred = q.defer();
        console.log("Adding book review from book.model.server");
        console.log(newBookReview);
        bookModel.create(newBookReview,function (err,status) {
            if(err){
                deferred.reject(new Error(err));
            }else{
                deferred.resolve(status);
            }
        });
        return deferred.promise;
    }

    function findBookReviewByReadersList(reviewerlist) {
        var deferred=q.defer();
        console.log("Getting  book reviews by reviewerlist book.model.server");
        console.log("reviewerlist _id are as follows");
        console.log(reviewerlist);
        bookModel.find({"reviewerid" : {$in : reviewerlist}},function (err,status) {
            if(err){
                deferred.reject(new Error(err));
            }
            else{
                deferred.resolve(status);
            }
        });
        return deferred.promise;
    }

    function findBookReviewByReaderId(rid) {
        var deferred=q.defer();
        console.log("Getting  book reviews by reviewerId book.model.server");
        console.log("reviewerId _id are as follows");
        console.log(rid);
        bookModel.find({"reviewerid":rid},function (err,status) {
            if(err){
                deferred.reject(new Error(err));
            }else{
                console.log("findBookReviewByReaderId");
                console.log(status);
                deferred.resolve(status);
            }
        });
        return deferred.promise;
    }

    function findBookReviewByBookISBN(isbnid) {
        var deferred=q.defer();
        console.log("Getting  book reviews by ISBN book.model.server");
        console.log("ISBN are as follows");
        console.log(isbnid);
        bookModel.find({'isbn':isbnid},function (err,status) {
            if(err){
                deferred.reject(new Error(err));
            }else{
                console.log("findBookReviewByISBN");
                deferred.resolve(status);
            }
        });
        return deferred.promise;
    }



};
