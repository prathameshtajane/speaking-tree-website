(function() {
    angular
        .module("webdevProject")
        .controller('booksreviewedlistController', booksreviewedlistController);

    function booksreviewedlistController($routeParams, $location, userService,bookService) {
        var vm = this;
        vm.userId=$routeParams['uid'];

        function init() {
                bookService
                    .findBookReviewsByReviewerId(vm.userId)
                    .success(function (bookobjects) {
                        vm.booksreviewedlist=bookobjects;
                    })
                    .error(function (err) {
                        console.log("Unable to fetch Books reviewed by this user");
                        console.log(err);
                    })
        }
        init()
    }
})();

