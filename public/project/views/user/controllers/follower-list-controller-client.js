(function() {
    angular
        .module("webdevProject")
        .controller('followerslistController',followerslistController);

    function followerslistController($routeParams,$location,userService) {
        var vm=this;
        vm.findfollowersOfUser=findfollowersOfUser;
        vm.goToFollowerProfileById=goToFollowerProfileById;
        vm.filterTable=filterTable;
        vm.filterTableAllUsers=filterTableAllUsers;
        vm.getAllUsers=getAllUsers;
        vm.goToHomepage=goToHomepage;

        userId=$routeParams['uid'];



        function init() {
            console.log("followerslistController");
            findfollowersOfUser(userId);
            console.log(userId);
        }
        init();

        function findfollowersOfUser(userid){
            userService
                .findUserById(userid)
                .success(function (user) {
                    console.log(user);
                    vm.followersInfo=user.followers;
                    vm.username=user.firstName;
                    vm.userId=user._id;})
                .error(function (error) {
                vm.error="Error occurred while retreiving user object for given user";
            })
        }

        function goToFollowerProfileById(followerId){
            /*$location.url('/profile/'+userId+'/follower/'+followerId);*/
            console.log("goToFollowerProfileById");
            console.log(followerId);
        }

        function filterTable(){
            console.log("Filter table called");
            var input, filter, table, tr, td, i;
            input = document.getElementById("myInput");
            filter = input.value.toUpperCase();
            table = document.getElementById("followersTable");
            tr = table.getElementsByTagName("tr");
            for (i = 0; i < tr.length; i++) {
                td = tr[i].getElementsByTagName("td")[2];
                if (td) {
                    if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                        tr[i].style.display = "";
                    } else {
                        tr[i].style.display = "none";
                    }
                }
            }
        }

        function filterTableAllUsers(){
            console.log("Filter table called");
            var input, filter, table, tr, td, i;
            input = document.getElementById("myInput2");
            filter = input.value.toUpperCase();
            table = document.getElementById("userstable");
            tr = table.getElementsByTagName("tr");
            for (i = 0; i < tr.length; i++) {
                td = tr[i].getElementsByTagName("td")[2];
                if (td) {
                    if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                        tr[i].style.display = "";
                    } else {
                        tr[i].style.display = "none";
                    }
                }
            }
        }


        function getAllUsers(){
            userService
                .findAllUsers()
                .success(function (userlist) {
                    vm.allUsers=userlist;
                })
                .error(function (err) {
                    console.log("Unable to fetch userlist");
                    console.log(err);
                })
        }

        function goToHomepage() {
            $location.url("/profile/"+userId+"/homepage");
        }
    }

})();
