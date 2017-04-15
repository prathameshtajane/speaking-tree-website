(function () {
    angular
        .module("webdevProject")
        .controller("articleEditController",articleEditController);

    function articleEditController($routeParams,$location,userService,articleService,bookService) {
        console.log("Reched Article edit controller");
        var vm=this;
        vm.updateArticle=updateArticle;
        vm.articleid=$routeParams['aid'];
        vm.userid=$routeParams['uid'];
        vm.goToHomepage=goToHomepage;
        vm.goToMyArticles=goToMyArticles;


        function init() {
            console.log(vm.articleid);
            vm.article={};
            articleService
                .findBookByArticleId(vm.articleid)
                .success(function (articleinfoObj) {
                    console.log(articleinfoObj);
                    vm.article.articletitle=articleinfoObj.articletitle;
                    vm.article.articlecontent=articleinfoObj.articlecontent
                })
                .error(function (error) {
                    console.log("Failed to get info about the article with id "+vm.articleid);
                })
        }
        init();

        function updateArticle(article,articleObj) {
            console.log("Article object from controller");
            console.log(article);
            console.log(articleObj);
            articleService
                .updateArticle(vm.articleid,articleObj)
                .success(function (status) {
                    console.log("Article updated succesfully");
                    vm.statusMessage="Article updated succesfully !"
                })
                .error(function (err) {
                    console.log("Article updation failed");
                    vm.statusMessage="Article updation FAILED !"
                })

        }

        function goToHomepage() {
            $location.url("/profile/"+vm.userid+"/homepage");
        }

        function goToMyArticles() {
            $location.url("/profile/"+vm.userid+"/articles");
        }

    }
})();
