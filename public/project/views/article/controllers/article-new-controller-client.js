(function () {
    angular
        .module("webdevProject")
        .controller("articleNewController",articleNewController);

    function articleNewController($routeParams,articleService,userService,$location) {
        console.log("Reached Article new controller");
        var vm=this;
        vm.submitArticle=submitArticle;
        vm.bookisbn=$routeParams['isbnid'];
        vm.authorid=$routeParams['uid'];
        vm.goToHomepage=goToHomepage;
        vm.goToMyProfile=goToMyProfile;

        function init() {
            userService
                .findBasicUserInfoByUserId(vm.authorid)
                .success(function (userInfo) {
                    console.log(userInfo);
                    vm.authorusername=userInfo.username;
                })
                .error(function (err) {
                    console.log(err);
                })
        }
        init();

        function submitArticle(article) {

            var newArticle={};
            newArticle.bookisbn=vm.bookisbn;
            newArticle.authorid=vm.authorid;
            newArticle.authorusername=vm.authorusername;
            newArticle.articletitle=article.title;
            newArticle.articlecontent=article.content;

            articleService
                .addBookArticleByBookISBN(vm.bookisbn,newArticle)
                .success(function (status) {
                    console.log(status);
                    vm.statusMessage="Article added succesfully"
                })
                .error(function (error) {
                    console.log(error);
                    vm.statusMessage="Article addition failed"
                })
        }

        function goToHomepage(){
                $location.url("/profile/"+vm.authorid+"/homepage");

        }
        function goToMyProfile(){
            $location.url("/profile/"+vm.authorid);
        }
    }
})();
