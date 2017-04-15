(function () {
    angular
        .module("webdevProject")
        .controller('articleslistController',articleslistController);

    function articleslistController($routeParams,$location,userService,articleService,bookService){
        var vm=this;
        vm.userid=$routeParams['uid'];
        vm.getBookInfoByBookISBN=getBookInfoByBookISBN;
        vm.deleteArticle=deleteArticle;
        vm.editArticle=editArticle;
        vm.goToProfilePage=goToProfilePage;
        vm.goToHomepage=goToHomepage;

        function init() {
            articleService
                .findBookArticleListByAuthorId(vm.userid)
                .success(function (articlelist){
                    console.log(articlelist);
                    vm.articlelist=articlelist;
                })
                .error(function (err) {
                    console.log("Failed to retreive article list of author with author id as"+vm.userid);
                })
        }
        init();

        function getBookInfoByBookISBN(bookisbn){
            console.log("getBookInfoByBookISBN");
            bookService
                .findBookReviewByBookISBN(bookisbn)
                .success(function (bookinfo) {
                    vm.bookinfo=bookinfo[0];
                    console.log(bookinfo[0]);
                })
                .error(function () {
                    console.log("Failed to retreive getBookInfoByBookISBN")
                })
        }

        function deleteArticle(aid) {
            console.log("deleteArticle");
            articleService
                .deleteBookArticleListByArticleId(aid)
                .success(function (status) {
                    console.log(status);
                    init();
                })
                .error(function () {
                    console.log("Failed to delete article")
                })
        }

        function editArticle(aid) {
            console.log("reached editArticle");
            console.log(aid);
            $location.url("#/user/"+vm.userid+"/article/"+aid+"/editarticle");
        }

        function goToProfilePage(){
            $location.url("#/user/"+vm.userid);
        }

        function goToHomepage() {
            $location.url("/profile/"+vm.userid+"/homepage");
        }
    }
})();

