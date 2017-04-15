/**
 * Created by prathamesh on 3/27/17.
 */
(function () {
    angular
        .module("webdevProject")
        .controller("booklistController",booklistController);

    function booklistController(BookService,$location) {
        var vm = this;
        vm.bookinfo=bookinfo;

        function init() {

        }

        function bookinfo() {
            console.log("Opening windows for specific book info");
            $location.url('/genre/44/bookid/'+ "44");
        }
    }
})();
