module.exports=function (app,mongoose) {
    var q = require('q');

    var articleSchema=require('../article/article.schema.server');
    var articleModel=mongoose.model('articleModel',articleSchema);

    var api={
        addBookArticleByBookISBN:addBookArticleByBookISBN,
        findBookArticleListByAuthorId:findBookArticleListByAuthorId,
        findBookArticleListByBookISBN:findBookArticleListByBookISBN,
        deleteBookArticleListByArticleId:deleteBookArticleListByArticleId,
        findBookByArticleId:findBookByArticleId,
        findArticlesByAuthorNameList:findArticlesByAuthorNameList,
        findAllBookArticles:findAllBookArticles,
        updateArticle:updateArticle
    };
    return api;


    /*function deleteArticleByArticleId(articleid){
        var deferred = q.defer();
        console.log("deleteArticleByArticleId from book.model.server");
        articleModel.remove({_id: articleid}, function (err, status) {
            if (err) {
                deferred.reject(new Error(err));
            } else {
                deferred.resolve(status);
            }
        });
        return deferred.promise;
    }*/

    function findAllBookArticles() {
        var deferred = q.defer();
        console.log("findAllBookArticles from book.model.server");
        articleModel.find({}, function (err, status) {
            if (err) {
                deferred.reject(new Error(err));
            } else {
                deferred.resolve(status);
            }
        });
        return deferred.promise;
    }

    function findArticlesByAuthorNameList(authorlist) {
        var deferred = q.defer();
        console.log("findArticlesByAuthorNameList from article.model.server");
        console.log(authorlist);
        articleModel.find({ "authorusername": { $in: authorlist}},function (err,status) {
            if(err){
                deferred.reject(new Error(err));
                console.log("Error sent from findArticlesByAuthorNameList article.model.server");
            }else{
                console.log("Status sent from findArticlesByAuthorNameList article.model.server");
                console.log(status);
                deferred.resolve(status);
            }
        });
        return deferred.promise;
    }

    function findBookByArticleId(articleid){
        var deferred = q.defer();
        console.log("findBookByArticleId from article.model.server");
        articleModel.findOne({'_id':articleid},function (err,status) {
            if(err){
                deferred.reject(new Error(err));
            }else{
                deferred.resolve(status);
            }
        });
        return deferred.promise;
    }

    function deleteBookArticleListByArticleId(articleid) {
        var deferred = q.defer();
        console.log("deleteBookArticleListByArticleId from article.model.server");
        articleModel.remove({'_id':articleid},function (err,status) {
            if(err){
                deferred.reject(new Error(err));
            }else{
                deferred.resolve(status);
            }
        });
        return deferred.promise;
    }

    function updateArticle(articleid,updatedArticle) {
        var deferred = q.defer();
        console.log(updatedArticle);
        newArticleTitle=updatedArticle.articletitle;
        newArticleContents=updatedArticle.articlecontent;

        console.log("calling updateUser from user.model.server.js");
        if(typeof (updatedArticle.userlikeids) == 'undefined'|| typeof (updatedArticle.userdislikeids) == 'undefined' ){
        articleModel.update({"_id":articleid},{$set:{"articletitle":newArticleTitle,"articlecontent":newArticleContents}},function (err,status){
            if(err){
                console.log("Recieved error at model while updating article");
                console.log(err);
                deferred.reject(new Error(err));
            }else{
                console.log("Article updation succesfull at model level");
                console.log(status);
                deferred.resolve(status);
            }
        });
        return deferred.promise;}
        else{
            newUserLikedList=updatedArticle.userlikeids;
            newUserDisLikedList=updatedArticle.userdislikeids;
            articleModel.update({"_id":articleid},{$set:{"articletitle":newArticleTitle,"articlecontent":newArticleContents,"userlikeids":newUserLikedList,"userdislikeids":newUserDisLikedList}},function (err,status){
                if(err){
                    console.log("Recieved error at model while updating article");
                    console.log(err);
                    deferred.reject(new Error(err));
                }else{
                    console.log("Article updation succesfull at model level");
                    console.log(status);
                    deferred.resolve(status);
                }
            });
            return deferred.promise;
        }

    }

    function addBookArticleByBookISBN(newBookArticle) {
        var deferred = q.defer();
        console.log("Adding book article from article.model.server");
        console.log(newBookArticle);
        articleModel.create(newBookArticle,function (err,status) {
            if(err){
                console.log("addBookArticleByBookISBN error at model.server.service");
                console.log(err);
                deferred.reject(new Error(err));
            }else{
                deferred.resolve(status);
                console.log("addBookArticleByBookISBN succesfull at model.server.service");
                console.log(status);
            }
        });
        return deferred.promise;
    }

    function findBookArticleListByAuthorId(authorid){
        var deferred = q.defer();
        console.log("findBookArticleListByAuthorId from article.model.server");
        console.log(authorid);
        if(!(authorid instanceof mongoose.Types.ObjectId)){
            authorid=mongoose.Types.ObjectId(authorid);
        }
        articleModel.find({'authorid':authorid},function (err,status) {
     if(err){
     deferred.reject(new Error(err));
     }else{
     deferred.resolve(status);
     }
     });
     return deferred.promise;
    }

    function findBookArticleListByBookISBN(isbn){
        var deferred = q.defer();
        console.log("findBookArticleListByBookId from article.model.server");
        console.log(isbn);
        /*if(!(isbn instanceof mongoose.Types.ObjectId)){
            isbn=mongoose.Types.ObjectId(isbn);
        }*/
        articleModel.find({'bookisbn':isbn},function (err,status) {
            if(err){
                deferred.reject(new Error(err));
            }else{
                deferred.resolve(status);
            }
        });
        return deferred.promise;
    }




};
