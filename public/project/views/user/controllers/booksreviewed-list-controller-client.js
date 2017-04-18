(function() {
    angular
        .module("webdevProject")
        .controller('booksreviewedlistController', booksreviewedlistController);

    function booksreviewedlistController($routeParams, $location, userService,bookService,$rootScope,$route) {
        var vm = this;
        vm.userId=$routeParams['uid'];
        vm.logout=logout;
        vm.goToHomepage=goToHomepage;
        vm.deleteReview=deleteReview;

        function init() {
                bookService
                    .findBookReviewsByReviewerId(vm.userId)
                    .success(function (bookobjects) {
                        vm.booksreviewedlist=bookobjects;
                        if(vm.booksreviewedlist.length == '0'){
                            vm.status="No Books reviewed yet";
                        }
                    })
                    .error(function (err) {
                        vm.status="No Books reviewed yet";
                        console.log("Unable to fetch Books reviewed by this user");
                        console.log(err);
                    })
        }
        init()

        function logout() {
            userService
                .logout()
                .success(
                    function (response) {
                        $rootScope.currentUser=null;
                        $location.url('/');
                    }
                )
        }

        function goToHomepage() {
            $location.url("/profile/"+vm.userId+"/homepage");
        }

        function deleteReview(reviewid){
            bookService
                .deleteBookReviewByReviewId(reviewid)
                .success(function (status) {
                    console.log("Review deleted succesfully");
                    $route.reload();
                })
                .error(function (err) {
                    console.log("Review not deleted succesfully");
                })
            }
    }
})();

