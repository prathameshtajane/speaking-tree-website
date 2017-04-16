
(function () {
    angular
        .module("webdevProject")
        .controller("bookinfoController",bookinfoController);

    function bookinfoController(bookService,userService,articleService,$location,$routeParams,$route,$rootScope) {
        var vm = this;
        vm.bookisbn=$routeParams['isbnid'];
        vm.bookvid=$routeParams['vid'];
        vm.userid=$routeParams['uid'];
        vm.getReviewerInfo=getReviewerInfo;
        vm.followMeClicked=followMeClicked;
        vm.goToHomepage=goToHomepage;
        vm.goToMyProfile=goToMyProfile;
        vm.goToWriteNewArticle=goToWriteNewArticle;
        vm.getBasicUserInfo=getBasicUserInfo;
        vm.goToProfileUpdatePage=goToProfileUpdatePage;
        vm.submitReview=submitReview;
        vm.addLikeToArtilce=addLikeToArtilce;
        vm.addDisLikeToArtilce=addDisLikeToArtilce;
        vm.logout=logout;

        function init() {
            console.log("Reached bookinfoController");
            bookService
                .findBookInfoByVolumeId(vm.bookvid)
                .success(function (bookInformation) {
                    console.log("bookInformation");
                    console.log(bookInformation);
                    vm.bookinfo=bookInformation;
                    bookService
                        .findBooksByAuthorName(bookInformation.volumeInfo.authors[0])
                        .success(function (booksbyauthor) {
                            vm.booksBySameAuthor=booksbyauthor.items;
                            console.log(vm.booksBySameAuthor);
                            bookService
                                .findBookReviewByBookISBN(vm.bookisbn)
                                .success(function (booksreviewslist) {
                                    console.log(booksreviewslist[0].reviewerid);
                                    vm.booksreviewslist=booksreviewslist;
                                    console.log("vm.booksreviewslist.length");
                                })
                                .error(function (error) {
                                    vm.noReviews="No Reviews available for this book"
                                })
                        })
                        .error(function (error) {
                            vm.error="Error occurred while retreiving books by author for given book";
                        })
                })
                .error(function (error) {
                    vm.error="Error occurred while retreiving book information for given book";
                });

            if(typeof(vm.userid) == 'undefined'){
                vm.userloginStatus=false;
                console.log("vm.userloginStatus");
                console.log(vm.userloginStatus);
                console.log(vm.userid);

            }
            else {
                vm.userloginStatus=true;
                console.log("vm.userloginStatus");
                console.log(vm.userloginStatus);
                console.log(vm.userid);

                userService
                    .findBasicUserInfoByUserId(vm.userid)
                    .success(function (userInfo) {
                        vm.userInfo=userInfo;
                        vm.userRole=userInfo.role;
                        console.log("Basic user Info as follows");
                        /*console.log(vm.userInfo);*/
                    })
                    .error(function (error) {
                        vm.error="Error occurred while retreiving user information for given userID";
                    })
            }

            articleService
                .findBookArticleListByBookISBN(vm.bookisbn)
                .success(function (articlesforthisbook) {
                    console.log("articlesforthisbook");
                    console.log(articlesforthisbook);
                    vm.bookarticlelist=articlesforthisbook;
                })
                .error(function (err) {
                    console.log("Unable to fetch articles for book with isbn"+vm.bookisbn);
                })
        }
        init();

        function goToHomepage(){
            if(vm.userloginStatus){
                $location.url("/profile/"+vm.userid+"/homepage");
            }
            else{
                $location.url("/");
            }

        }

        function goToMyProfile(){
                $location.url("/profile/"+vm.userid);
        }

        function getReviewerInfo(reviewerusername){
            userService
                .findUserByUserName(reviewerusername)
                .success(function (reviewerinfo) {
                    /*console.log(reviewerinfo);*/
                    vm.reviewerinfo=reviewerinfo;
                })
                .error(function (error) {
                    vm.error="Error occurred while retreiving reviewer info for given reviewer";
                });

        }

        function followMeClicked(destinationObject){

            var sourceObject={
                "username" : "prathamesh",
                "password" : "qwe",
                "firstName" : "prathamesh",
                "lastName" : "tajane",
                "email" : "ptajane@gmail.com",
                "phone" : "1234",
                "role" : "reader",
                "books" : [ ],
                "following" : [ ],
                "followers" : [
                    {
                        "username" : "prathamesha",
                        "password" : "qwe",
                        "firstName" : "prathameshA",
                        "lastName" : "tajaneA",
                        "email" : "ptajaneA@gmail.com",
                        "phone" : "1234A",
                        "followers" : [ ],
                        "following" : [ ],
                        "books" : [ ],
                        "role" : "author"
                    }
                ],
                "__v" : 0
            };
            console.log("destinationObject");
            console.log(destinationObject);
            console.log("sourceObject");
            console.log(sourceObject);
            userService
                .addFollower(sourceObject,destinationObject)
                .success(function (addFollowerStatus) {
                    console.log("Add Follower succesfull");
                    console.log(addFollowerStatus);
                })
                .error(function (err) {
                    console.log("Add Follower failed");
                    console.log(err);
                })
        }

        function getBasicUserInfo(userid) {
            userService
                .findBasicUserInfoByUserId(userid)
                .success(function (basicUserInfo) {
                    vm.reviewerinfo=basicUserInfo
                })
                .error(function () {
                    console.log("Unable to fetch information of user "+userid);
                })
        }

        function goToWriteNewArticle() {
            $location.url("/user/"+vm.userid+"/bookinfo/"+vm.bookisbn+"/volumeinfo/"+vm.bookvid+"/newarticle");
        }

        function goToProfileUpdatePage() {
            $location.url("/profile/"+vm.userid+"/update");
        }

        function submitReview(newReview) {
            console.log(newReview);
            var reviewToBeAdded=newReview;
            reviewToBeAdded.bookname=vm.bookinfo.volumeInfo.title;
            reviewToBeAdded.isbn=vm.bookisbn;
            reviewToBeAdded.authorname=vm.bookinfo.volumeInfo.authors[0];
            reviewToBeAdded.imgurl=vm.bookinfo.volumeInfo.imageLinks.smallThumbnail;
            reviewToBeAdded.reviewerid=vm.userid;
            reviewToBeAdded.reviewername=vm.userInfo.username;
            console.log("Review to be added in database");
            console.log(reviewToBeAdded);
            bookService
                .addBookReviewByBookISBN(reviewToBeAdded)
                .success(function (addBookReviewStatus) {
                console.log("Book Review addition succesfull");
                console.log(addBookReviewStatus);
                $route.reload();
                init();
                })
                .error(function (err) {
                    console.log("Book Review addition failed");
                    console.log(err);
                })


        }

        function addLikeToArtilce(bookarticle) {
            console.log("Book article liked");
            bookarticle.userlikeids.push(vm.userid);
            console.log(bookarticle);
            articleService
                .updateArticle(bookarticle._id,bookarticle)
                .success(function (status) {
                    console.log("Articles updated succesfully");
                })
                .error(function (err) {
                    console.log("Articles updation failed");
                })

        }

        function addDisLikeToArtilce(bookarticle) {
            console.log("Book article disliked");
            bookarticle.userdislikeids.push(vm.userid);
            console.log(bookarticle);
            articleService
                .updateArticle(bookarticle._id,bookarticle)
                .success(function (status) {
                    console.log("Articles updated succesfully");
                })
                .error(function (err) {
                    console.log("Articles updation failed");
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
