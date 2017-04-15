/**
 * Created by prathamesh on 3/27/17.
 */
(function () {
    angular
        .module("webdevProject")
        .controller('registerController',registerController);

    function registerController(userService,$location) {
        var vm = this;
        vm.registerUser = registerUser;

        function init() {
        }

        init();
        function registerUser(user){
            console.log(user);
            if(user != undefined) {
                if(user.password == user.password1) {
                    userService
                        .findUserByUserName(user.username)
                        .success(function (user) {
                            vm.error = "Unable to register this User";})
                        .error(function (err) {
                            vm.error = "Going ahead with the regitsration of new user";
                            userService
                                .createUser(user)
                                .success(function (newUserObj) {
                                    $location.url('/profile/' + newUserObj._id);})
                        });
                }
                else{
                    vm.error="Password does not match.Cannot proceed."
                }
            }
            else
            {
                vm.error='Incomplete form submission.Cannot proceed'
            }
        }

    }
})();
