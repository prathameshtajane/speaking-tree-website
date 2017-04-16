(function () {
    angular
        .module("webdevProject")
        .controller('adminController',adminController);
    
    function adminController(userService,bookService,articleService,$location,$rootScope) {
        var vm = this;
        vm.getAllUsers=getAllUsers;
        vm.getAllArticles=getAllArticles;
        vm.getAllReviews=getAllReviews;
        vm.userfilterTable=userfilterTable;
        vm.articlesfilterTable=articlesfilterTable;
        vm.reviewsfilterTable=reviewsfilterTable;
        vm.deleteUser=deleteUser;
        vm.deleteReview=deleteReview;
        vm.deleteArticle=deleteArticle;
        vm.logout=logout;

        function init() {

        }
        init();

        function deleteUser(user) {
            userid=user._id;
            console.log("Delete user called from admin controller for "+userid);
            userService
                .deleteUser(userid)
                .success(function (status) {
                    console.log("User deleted succesfully");
                })
                .error(function (err) {
                    console.log("User deletion failed");
                })
        }

        function deleteReview(review) {
            console.log("deleteReview called for");
            reviewId=review._id;
            console.log(reviewId);
            bookService
                .deleteBookReviewByReviewId(reviewId)
                .success(function (status) {
                    console.log("review deleted succesfully");
                })
                .error(function (err) {
                    console.log("review deletion failed");
                })
        }

        function deleteArticle(article) {
            console.log("deleteArticle called for");
            articleId=article._id;
            articleService
                .deleteBookArticleListByArticleId(articleId)
                .success(function (status) {
                    console.log("article deleted succesfully");
                })
                .error(function (err) {
                    console.log("article deletion failed");
                })
        }





        function getAllUsers() {
            userService
                .findAllUsers()
                .success(function (userlist) {
                    console.log("userlist");
                    vm.allUsers=userlist;
                })
                .error(function () {
                    console.log("Failed to fetch userlist");
                });
        }

        function getAllArticles() {
            articleService
                .findAllBookArticles()
                .success(function (articlelist) {
                    console.log("articlelist");
                    console.log(articlelist);
                    vm.allArticles=articlelist;
                })
                .error(function () {
                    console.log("Failed to fetch articlelist");
                });
        }

        function getAllReviews() {
            bookService
                .findAllBookReviews()
                .success(function (reviewlist) {
                    console.log("reviewlist");
                    vm.allReviews=reviewlist;
                })
                .error(function () {
                    console.log("Failed to fetch reviewlist");
                });
        }

        function userfilterTable(){
            console.log("user Filter table called");
            var input, filter, table, tr, td, i;
            input = document.getElementById("myInput");
            filter = input.value.toUpperCase();
            table = document.getElementById("userlist");
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

        function articlesfilterTable(){
            console.log("user Filter table called");
            var input, filter, table, tr, td, i;
            input = document.getElementById("myInput2");
            filter = input.value.toUpperCase();
            table = document.getElementById("articlelist");
            tr = table.getElementsByTagName("tr");
            for (i = 0; i < tr.length; i++) {
                td = tr[i].getElementsByTagName("td")[0];
                if (td) {
                    if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                        tr[i].style.display = "";
                    } else {
                        tr[i].style.display = "none";
                    }
                }
            }
        }

        function reviewsfilterTable(){
            console.log("review Filter table called");
            var input, filter, table, tr, td, i;
            input = document.getElementById("myInput3");
            filter = input.value.toUpperCase();
            table = document.getElementById("reviewlist");
            tr = table.getElementsByTagName("tr");
            for (i = 0; i < tr.length; i++) {
                td = tr[i].getElementsByTagName("td")[1];
                if (td) {
                    if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                        tr[i].style.display = "";
                    } else {
                        tr[i].style.display = "none";
                    }
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

    }
})();
