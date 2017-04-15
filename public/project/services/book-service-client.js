/**
 * Created by prathamesh on 3/27/17.
 */
(function () {
    angular
        .module('webdevProject')
        .factory('bookService',bookService);

    function bookService($http) {

        var api = {

            "findBookReviewsByUserIdList" :findBookReviewsByUserIdList,
            "findBookReviewsByReviewerId" :findBookReviewsByReviewerId,
            "findSimilarBooksByBookName" :findSimilarBooksByBookName,
            "findBookInfoByVolumeId" :findBookInfoByVolumeId,
            "findBooksByAuthorName" :findBooksByAuthorName,
            "findBookReviewByBookISBN" :findBookReviewByBookISBN,
            "addBookReviewByBookISBN" :addBookReviewByBookISBN,
            "findAllBookReviews":findAllBookReviews,
            "deleteBookReviewByReviewId":deleteBookReviewByReviewId

        };
        return api;

        function findBookReviewsByReviewerId(uid){
            console.log("Reached findBookReviewsByReviewerId book-service-client");
            /*var req = {
             method: 'GET',
             url: "/api/rbooks/"+uid,
             headers: {
             'Content-Type': "application/json",
             'Accept':"application/json"
             }
             };
             return $http(req);*/
            return $http.get("/api/book/rbooks/"+uid);
        }

        function deleteBookReviewByReviewId(reviewId) {
            console.log("Reached deleteBookReviewByReviewId book-service-client");
            return $http.delete("/api/review/"+reviewId);
        }


        function findAllBookReviews() {
            console.log("Reached findAllBookReviews book-service-client");
            return $http.get("/api/book/findallreviews");
        }

        function findBookReviewByBookISBN(isbnId) {
            console.log("Reached findBookReviewByBookISBN book-service-client");
            return $http.get("/api/bookisbn/"+isbnId);
        }

        function findBookReviewsByUserIdList(uid){
            console.log("Reached findBookReviewsByUserIdList book-service-client");
            return $http.get("/api/user/"+uid+"/reviewlist");
        }


        function findSimilarBooksByBookName(bookname){
            console.log("Reached findSimilarBooksByBookName book-service-client");
            return $http.get("https://www.googleapis.com/books/v1/volumes?q="+bookname+"&key=AIzaSyDdMF2VTkujNMyeaDrmzilg7wiC5PnzUvU");
        }

        function findBookInfoByVolumeId(vid){
            console.log("Reached findBookInfoByVolumeId book-service-client");
            return $http.get("https://www.googleapis.com/books/v1/volumes/"+vid);
        }

        function findBooksByAuthorName(authorname){
            console.log("Reached findBooksByAuthorName book-service-client");
            return $http.get("https://www.googleapis.com/books/v1/volumes?q=inauthor:"+authorname+"&key=AIzaSyDdMF2VTkujNMyeaDrmzilg7wiC5PnzUvU");
        }

        function addBookReviewByBookISBN(bookreview){
            console.log("Reached addBookReviewByBookISBN from book.service.client");
            var req = {
                method: 'POST',
                url: '/api/user/',
                headers: {
                    'Content-Type': "application/json",
                    'Accept':"application/json"
                },
                data: bookreview
            };
            return $http(req);
        }

    }
})();
