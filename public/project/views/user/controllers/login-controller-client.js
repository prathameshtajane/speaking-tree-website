(function () {
    angular
        .module("webdevProject")
        .controller('loginController',loginController);
    
    function loginController(userService,$location,$rootScope) {
        var vm = this;
        vm.login=login;
        vm.goToHomepage=goToHomepage;

        function init() {
        }
        init();

        function goToHomepage() {
            $location.url("/");
        }

        function login(user){
            console.log("User controller");
            if(typeof user != 'undefined'){
            userService
                .findUserByCredentails(user.username,user.password)
                .success(function (user) {
                    console.log(user);
                    $rootScope.currentUser=user;
                    if(user.role == 'admin'){
                        $location.url('/profile/admin');
                    }
                    else{
                    $location.url('/profile/');
                    }
                })
                .error(function (err) {
                    vm.error = 'Sorry,This user does not exists';
                })
            }
            else{
                vm.error = 'Please enter Username and Password';
            }

        }
        
    }
})();
