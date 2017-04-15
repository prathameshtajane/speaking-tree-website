(function () {
    angular
        .module("webdevProject")
        .controller('profileUpdateController',profileUpdateController);

    function profileUpdateController($routeParams,$location,userService,bookService){
        var vm=this;
        vm.userid=$routeParams['uid'];
        vm.goToHomepage=goToHomepage;
        vm.goToMyProfile=goToMyProfile;
        vm.updateUser=updateUser;
        vm.user={};

        function init(){
            console.log("profileUpdateController loaded");
            console.log(vm.userid);
            userService
                .findBasicUserInfoByUserId(vm.userid)
                .success(function (userInfo) {
                    console.log("UserInfo is as follows");
                    console.log(userInfo);
                    vm.user.username=userInfo.username;
                    vm.user.firstname=userInfo.firstName;
                    vm.user.lastname=userInfo.lastName;
                    vm.user.email=userInfo.email;

                })
                .error(function (error) {
                    vm.error="Error occurred while retreiving user object for given user";
                })
        }
        init();


        function goToHomepage() {
            $location.url("/profile/"+vm.userid+"/homepage");
        }

        function goToMyProfile() {
            $location.url("/profile/"+vm.userid);
        }

        function updateUser(newUserObj) {
            console.log("Reached updateUser from profile update controller");
            if(newUserObj.password == null || newUserObj.password==""){
                console.log("Cannot proceed");
                vm.status="Please enter password !";

            }
            else{
            userService
                .updateUser(vm.userid,newUserObj)
                .success(function (status) {
                    console.log("User updated sucessfully");
                    vm.status="User Information Updation Succesfull.";
                })
                .error(function (err) {
                    console.log("Failed to updaet user Info");
                    vm.status="User Information Updatation Failed!";
                })
            }
        }
    }
})();
