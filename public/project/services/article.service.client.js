/**
 * Created by prathamesh on 3/27/17.
 */
/**
 * Created by prathamesh on 2/7/17.
 */
(function () {
    angular
        .module('webdevProject')
        .factory('articleService',articleService);

    function articleService($http) {

        var api = {
            "findBookArticleListByAuthorId" :findBookArticleListByAuthorId,
            "findBookArticleListByBookISBN" :findBookArticleListByBookISBN,
            "deleteBookArticleListByArticleId" :deleteBookArticleListByArticleId,
            "findBookByArticleId" :findBookByArticleId,
            "updateArticle" :updateArticle,
            "findArticlesByAuthorNameList" :findArticlesByAuthorNameList,
            "findAllBookArticles" : findAllBookArticles,
            "addBookArticleByBookISBN":addBookArticleByBookISBN
        };
        return api;

        function findAllBookArticles() {
            console.log("Reached findAllBookArticles from article.service.client");
            return $http.get("/api/articles/findallarticles");
        }

        function findArticlesByAuthorNameList(username) {
            console.log("Reached findArticlesByAuthorNameList from article.service.client");
            console.log(username);
            return $http.get("/api/followingarticles/"+username);
        }


        function addBookArticleByBookISBN(bookisbn,newArticle) {
            console.log("Reached addBookArticleByBookISBN from article.service.client");
            console.log(bookisbn);

            console.log("Reached addBookArticleByBookISBN from article.service.client");
            var req = {
                method: 'POST',
                url: '/api/book/'+bookisbn+'/newarticle',
                headers: {
                    'Content-Type': "application/json",
                    'Accept':"application/json"
                },
                data: newArticle
            };
            return $http(req);

        }
        function updateArticle(articleid,articleObj){
            console.log("Reached updateArticle from article.service.client");
            console.log(articleid);
            console.log(articleObj);

            console.log("Reached updateArticle from article.service.client");
            var req = {
                method: 'POST',
                url: '/api/articles/'+articleid,
                headers: {
                    'Content-Type': "application/json",
                    'Accept':"application/json"
                },
                data: articleObj
            };
            return $http(req);

            /*return $http.post("/api/articles/"+articleid,articleObj);*/
        }

        function findBookByArticleId(articleid) {
            console.log("Reached findBookByArticleId from article.service.client");
            console.log(articleid);
            return $http.get("/api/articles/"+articleid);
        }

        function findBookArticleListByAuthorId(authorid) {
            console.log("Reached findBookArticleListByAuthorId from article.service.client");
            console.log(authorid);
            return $http.get("/api/author/"+authorid+"/articles");
        }

        function findBookArticleListByBookISBN(bookisbn) {
            console.log("Reached findBookArticleListByBookISBN from article.service.client");
            console.log(bookisbn);
            return $http.get("/api/articles/book/"+bookisbn);
        }

        function deleteBookArticleListByArticleId(aid) {
            console.log("Reached deleteBookArticleListByArticleId from article.service.client");
            console.log(aid);
            return $http.delete("/api/articles/"+aid);
        }
    }
})();
