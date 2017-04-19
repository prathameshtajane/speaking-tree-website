(function() {
    angular
        .module("webdevProject")
        .controller('followinglistController',followinglistController);

    function followinglistController($routeParams,$location,userService,$rootScope) {
        var vm=this;
        vm.findfollowingOfUser=findfollowingOfUser;
        vm.goToHomepage=goToHomepage;
        vm.logout=logout;
        /*vm.goToUserProfileById=goToFollowerProfileById;*/

        var userId=$routeParams['uid'];

        function init() {
            console.log("followinglistController");
            findfollowingOfUser(userId);
            console.log(userId);
        }
        init();

        function goToHomepage() {
            $location.url("/profile/"+userId+"/homepage");
        }

        function findfollowingOfUser(userid){
            userService
                .findUserById(userid)
                .success(function (user) {
                    vm.followingInfo=user.following;
                    vm.username=user.firstName;})
                .error(function (error) {
                vm.error="Error occurred while retreiving user object for given user";
            })
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
