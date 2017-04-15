(function () {
    angular
        .module("webdevProject")
        .controller('loginController',loginController);
    
    function loginController(userService,$location,$rootScope) {
        var vm = this;
        vm.login=login;

        function init() {
        }
        init();

        function login(user){
            console.log("User controller");
            console.log(user);

            userService
                .findUserByCredentails(user.username,user.password)
                .success(function (user) {
                    console.log(user);
                    $rootScope.currentUser=user;
                    if(user.role == 'admin'){
                        $location.url('/profile/admin');
                    }
                    else{
                    $location.url('/profile/' + user._id);
                    }
                })
                .error(function (err) {
                    vm.error = 'Sorry,This user does not exists';
                })

        }
        
    }
})();
