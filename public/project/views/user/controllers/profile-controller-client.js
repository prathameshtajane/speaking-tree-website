(function () {
    angular
        .module("webdevProject")
        .controller('profileController',profileController);

    function profileController($routeParams,$route,$window,$location,userService,$timeout,articleService,bookService,$anchorScroll,$rootScope){
        var vm=this;
        /*vm.userid=$routeParams['uid'];*/
        vm.userid=$rootScope.currentUser._id;
        vm.followerid=$routeParams['fid'];


        vm.followersListPage=followersListPage;
        vm.followingListPage=followingListPage;
        vm.findBookReviewsByReviewerId=findBookReviewsByReviewerId;
        vm.loadBooksReviewedList=loadBooksReviewedList;
        vm.getAllUsers=getAllUsers;
        vm.filterTable=filterTable;
        vm.goToHomepage=goToHomepage;
        vm.goToFollowersPage=goToFollowersPage;
        vm.goToFollowingPage=goToFollowingPage;
        vm.goToProfileUpdatePage=goToProfileUpdatePage;
        vm.personalProfileFlag=false;
        vm.goToArticlesSection=goToArticlesSection;
        vm.addFollower=addFollower;
        vm.logout=logout;
        vm.findUser=findUser;


        function init(){
            vm.noReviews="";
            vm.noArticles="";
            console.log("profileController loaded");
            console.log("$rootScope.currentUser");
            vm.reviewListCount=0;
            console.log($rootScope.currentUser._id);
            userService
                .findUserById(vm.userid)
                .success(function (user) {
                    vm.followersInfo=user.followers;
                    vm.currentUser=user;

                    vm.followerInfo=[];
                    for(var i=0;i < (user.followers.length);i++){
                        userService
                            .findUserByUserName(user.followers[i].username)
                            .success(function (userInfo) {
                                vm.followerInfo.push({"username":userInfo.username,
                                 "profileurl":userInfo.profileurl});
                            })
                            .error(function () {
                                console.log("Error occurred while fetching userOnf from follower list");
                            })

                    }
                    console.log("vm.followerInfo");
                    console.log(vm.followerInfo);

                    console.log(user.following.length);
                    if(user.followers.length == 0){
                        vm.followerCount='0';
                    }
                    else{
                        vm.followerCount=user.followers.length;
                    }

                    if(user.following.length == 0){
                        vm.followingCount='0';
                    }
                    else{
                        vm.followingCount=user.following.length;
                        console.log("vm.followingCount");
                        console.log(vm.followingCount);
                    }
                    vm.username=user.username;
                    vm.firstName=user.firstName;
                    vm.userrole=user.role;
                    vm.profilepic=user.profileurl;
                    followerArray=user.followers;
                    console.log("User received");
                    console.log(user);

                    var followingIdList=[];
                    var following = user.following;

                    userService
                        .getReviewsOfFollowingUsers(vm.username)
                        .success(function (reviewlist){
                            console.log("Review list of all the following from profile controller");
                            vm.reviewlist=reviewlist;
                            if(reviewlist.length == '0'){
                                vm.noReviews="No Reviews by your following to display."
                            }
                            console.log(reviewlist);

                        })
                        .error(function (err) {
                            console.log("Failed to get review list of all following users");
                            console.log(err);
                        });

                    /*bookService
                        .findBookReviewsByUserIdList(vm.userid)
                        .success(function (userlist) {
                            console.log("findBookReviewsByUserIdList Success in controller");
                            console.log("userlist");
                            console.log(userlist);
                            /!*vm.bookslist=userlist;*!/
                        })
                        .error(function (err) {
                            console.log("findBookReviewsByUserIdList Error in controller");
                            console.log(err);
                        });*/


                    bookService
                        .findBookReviewsByReviewerId(vm.userid)
                        .success(function (reviewlist) {
                            console.log("findBookReviewsByReviewerId Success in controller");
                            console.log("reviewlist");
                            console.log(reviewlist);
                            if(reviewlist.length == "0"){
                                vm.reviewListCount="0";
                            }else {
                                /*vm.reviewListCount="0";*/
                                vm.reviewListCount = reviewlist.length;
                            }
                        })
                        .error(function (err) {
                            console.log("findBookReviewsByUserIdList Error in controller");
                            console.log(err);
                        });


                    articleService
                        .findArticlesByAuthorNameList(vm.username)
                        .success(function (articlelist) {
                            console.log("Articles list of all the following from profile controller");
                            console.log(articlelist);
                            vm.articlelist=articlelist;
                            if(articlelist.length == '0'){
                                vm.noArticles="No articles by your following to display."
                            }
                        })
                        .error(function (err) {
                            console.log("Failed to get articlelist list of all following users");
                            console.log(err);
                        });
                })
                .error(function (error) {
                    vm.error="Error occurred while retreiving user object for given user";
                });

            articleService
                .findBookArticleListByAuthorId(vm.userid)
                .success(function (articlelist) {
                    vm.articlesReviewedCount=articlelist.length;
                    console.log(articlelist);
                })
                .error(function (err) {
                    console.log("Failed to get articles info for the user "+vm.userid);
                });


                if(typeof vm.followerid == 'undefined'){
                    vm.personalProfileFlag=true;
                }


        }
        init();

        function followersListPage() {
            $location("#/profile/"+userid+"/followers");
        }

        function followingListPage() {
            $location("#/profile/"+userid+"/following");
        }

        function loadBooksReviewedList(uid){
            $location("#/profile/"+uid+"/booksreviewed");
        }

        function findBookReviewsByReviewerId() {
            bookService
                .findBookReviewsByReviewerId(vm.userid)
                .success(function (bookobjects) {
                    console.log(bookobjects);
                    if(bookobjects.length == 0){
                        vm.bookslistlen='0';
                    }
                    else{
                    vm.bookslistlen=bookobjects.length;
                    }
                })
                .error(function (err) {
                    console.log("Unable to fetch Books reviewed by this user");
                    console.log(err);
                })
        }

        function getAllUsers(){
            userService
                .findAllUsers()
                .success(function (userlist) {
                    console.log(userlist);
                    vm.allUsers=userlist;
                })
                .error(function (err) {
                    console.log("Unable to fetch userlist");
                    console.log(err);
                })
        }

        function filterTable(){
            console.log("Filter table called");
            var input, filter, table, tr, td, i;
            input = document.getElementById("myInput");
            filter = input.value.toUpperCase();
            table = document.getElementById("userstable");
            console.log(table);
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

        function goToHomepage() {
            $location.url("/profile/"+vm.userid+"/homepage");
        }

        function goToProfileUpdatePage() {
            $location.url("/profile/"+vm.userid+"/update");
        }

        function goToFollowersPage(userid) {
            $location.url("/profile/"+userid+"/followers");
        }

        function goToFollowingPage(userid) {
            $location.url("/profile/"+userid+"/following");
        }

        function goToArticlesSection() {
            $location.hash('articles');
            $anchorScroll();
        }
        
        function addFollower(destinationUser) {
            vm.fstatus="";
            vm.duplicatef='0';
            allUsers=vm.allUsers;
            sourceObject=vm.currentUser;

            for(var i=0;i<sourceObject.following.length;i++){
                if(sourceObject.following[i].username == destinationUser.username){
                    vm.duplicatef='1';
                    console.log("setting vm.duplicatef=1");
                }
            }
            if(vm.duplicatef == '1'){
                vm.fstatus = "Sorry,You are already following "+destinationUser.username;
            }else {
                if (sourceObject.username != destinationUser.username) {
                    userService
                        .addFollower(sourceObject, destinationUser)
                        .success(function (status) {
                            console.log("Add follower succesfull");
                            console.log(status);
                            /*$location.url('/profile/');*/
                            init();
                        })
                        .error(function (err) {
                            console.log("Add follower Failed");
                            console.log(err);
                        })
                } else {
                    $timeout(function () {
                        vm.fstatus = null;
                    }, 2000);
                    vm.fstatus = "Sorry,You can not be your own follower!"
                }
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

        function findUser(follower) {
            userService
                .findUserByUserName(follower.username)
                .success(function (user) {
                    vm.displaypicurl=user.profileurl;
                    console.log("vm.displaypicurl");
                    console.log(vm.displaypicurl);
                })
                .error(function (err) {
                    console.log("Error occrued while fetching display url");
                })
        }


    }
})();
