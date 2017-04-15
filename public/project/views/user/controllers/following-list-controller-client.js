(function() {
    angular
        .module("webdevProject")
        .controller('followinglistController',followinglistController);

    function followinglistController($routeParams,$location,userService) {
        var vm=this;
        vm.findfollowingOfUser=findfollowingOfUser;
        /*vm.goToUserProfileById=goToFollowerProfileById;*/

        var userId=$routeParams['uid'];

        function init() {
            console.log("followinglistController");
            findfollowingOfUser(userId);
            console.log(userId);
        }
        init();

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

        /*function goToUserProfileById(userid){
            $location.url('/profile/'+userid);
        }*/
    }
})();
