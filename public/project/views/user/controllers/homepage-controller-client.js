/**
 * Created by prathamesh on 3/27/17.
 */
(function () {
    angular
        .module("webdevProject")
        .controller('homepageController',homepageController);

    function homepageController(userService,$location,bookService,$routeParams,$rootScope) {
        var vm = this;

        vm.login = login;
        vm.register = register;
        vm.goToBookInfo = goToBookInfo;
        vm.booksearch=booksearch;
        vm.gotoEditProfile=gotoEditProfile;
        vm.logout=logout;
        vm.userId=$routeParams['uid'];


        function init() {

            vm.booksearch({'bookname': "computer"});

            if(typeof(vm.userId) == 'undefined'){
                vm.userloginStatus=false;
                console.log("vm.userloginStatus");
                console.log(vm.userloginStatus);
                console.log(vm.userId);

            }
            else {
                vm.userloginStatus=true;
                console.log("vm.userloginStatus");
                console.log(vm.userloginStatus);
                console.log(vm.userId);
            }
        }
        init();

        function login() {
            $location.url('/login');
        }

        function register() {
            $location.url('/register');
        }

        function gotoEditProfile() {
            $location.url('/profile/'+vm.userId+'/update');
        }


        function booksearch(bookinfo){
            console.log(bookinfo.bookname);
            bookService
                .findSimilarBooksByBookName(bookinfo.bookname)
                .success(function (bookinfo) {
                    console.log(bookinfo.items);
                    vm.bookinfolist=bookinfo.items;
                    })
                .error(function (error) {
                    vm.error="Error occurred while retreiving user object for given user";
                })

        }

        function goToBookInfo(vid,isbnid) {
            console.log("Reached goToBookInfo");
            if(typeof vm.userId == 'undefined'){
                console.log("calling normal book review page");
                $location.url('/bookinfo/'+isbnid+'/volumeinfo/'+vid);
            }
            else{
                console.log("calling user specific book review page");
                $location.url('/profile/'+vm.userId+'/homepage/bookinfo/'+isbnid+'/volumeinfo/'+vid);

            }

        }

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

    }
})();
