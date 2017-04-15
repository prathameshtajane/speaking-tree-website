(function () {
    angular
        .module("webdevProject")
        .controller('followerProfilePageController',followerProfilePageController);

    function followerProfilePageController(userService,$location) {
        var vm = this;
        function init(){
            console.log("followerProfilePageController loaded");
        }
        init();
    }
})();

