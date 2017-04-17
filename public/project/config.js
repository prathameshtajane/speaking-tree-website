/**
 * Created by prathamesh on 3/27/17.
 */
(function () {
    angular
        .module("webdevProject")
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when("/",{
                templateUrl:'project/views/user/templates/homepage-view-client.html',
                controller:'homepageController',
                controllerAs:'model'
            })

            .when("/login",{
                templateUrl:'project/views/user/templates/login-view-client.html',
                controller:'loginController',
                controllerAs:'model'
            })

            .when("/profile",{
                templateUrl:'project/views/user/templates/profile-view-client.html',
                controller:'profileController',
                controllerAs:'model',
                resolve:{
                    loggedin : checkLoggedin
                }
            })

            .when("/profile/:uid/homepage",{
                templateUrl:'project/views/user/templates/homepage-view-client.html',
                controller:'homepageController',
                controllerAs:'model'
            })

            .when("/register",{
                templateUrl:'project/views/user/templates/register-view-client.html',
                controller:'registerController',
                controllerAs:'model'
            })

            .when("/profile/admin",{
                templateUrl:'project/views/user/templates/admin-view-client.html',
                controller:'adminController',
                controllerAs:'model',
                resolve:{
                    loggedin : checkAdminLoggedin
                }
            })


            .when("/profile/:uid",{
                templateUrl:'project/views/user/templates/profile-view-client.html',
                controller:'profileController',
                controllerAs:'model',
                resolve:{
                    loggedin : checkLoggedin
                }
            })


            .when("/profile/:uid/update",{
                templateUrl:'project/views/user/templates/profile-update-view-client.html',
                controller:'profileUpdateController',
                controllerAs:'model',
                resolve:{
                    loggedin : checkLoggedin
                }
            })

            .when("/profile/:uid/following",{
                templateUrl:'project/views/user/templates/following-list-view-client.html',
                controller:'followinglistController',
                controllerAs:'model',
                resolve:{
                    loggedin : checkLoggedin
                }
            })

            .when("/profile/:uid/followers",{
                templateUrl:'project/views/user/templates/follower-list-view-client.html',
                controller:'followerslistController',
                controllerAs:'model',
                resolve:{
                    loggedin : checkLoggedin
                }
            })

            .when("/profile/:uid/booksreviewed",{
                templateUrl:'project/views/user/templates/booksreviewed-list-view-client.html',
                controller:'booksreviewedlistController',
                controllerAs:'model',
                resolve:{
                    loggedin : checkLoggedin
                }
            })

            .when("/profile/:uid/articles",{
                templateUrl:'project/views/article/templates/articlelist-view-client.html',
                controller:'articleslistController',
                controllerAs:'model',
                resolve:{
                    loggedin : checkLoggedin
                }
            })


            .when("/profile/:uid/follower/:fid",{
                templateUrl:'project/views/user/templates/follower-profile-view-client.html',
                controller:'followerProfilePageController',
                controllerAs:'model',
                resolve:{
                    loggedin : checkLoggedin
                }
            })


            .when("/genre/:gid",{
                templateUrl:'project/views/book/templates/booklist-view-client.html',
                controller:'booklistController',
                controllerAs:'model',
                resolve:{
                    loggedin : checkLoggedin
                }
            })

            .when("/bookinfo/:isbnid/volumeinfo/:vid",{
                templateUrl:'project/views/book/templates/bookinfo-view-client.html',
                controller:'bookinfoController',
                controllerAs:'model'
                /*resolve:{
                    loggedin : checkLoggedin
                }*/
            })

            .when("/user/:uid/bookinfo/:isbnid/volumeinfo/:vid/newarticle",{
                templateUrl:'project/views/article/templates/article-new-view-client.html',
                controller:'articleNewController',
                controllerAs:'model',
                resolve:{
                    loggedin : checkLoggedin
                }
            })

            .when("/user/:uid/article/:aid/editarticle",{
                templateUrl:'project/views/article/templates/article-edit-view-client.html',
                controller:'articleEditController',
                controllerAs:'model',
                resolve:{
                    loggedin : checkLoggedin
                }
            })

            .when("/profile/:uid/homepage/bookinfo/:isbnid/volumeinfo/:vid",{
                templateUrl:'project/views/book/templates/bookinfo-view-client.html',
                controller:'bookinfoController',
                controllerAs:'model',
                resolve:{
                    loggedin : checkLoggedin
                }
            })

            .otherwise({
                redirectTo:'#/'
                });

    }

    var checkLoggedin = function($q, $timeout, $http, $location, $rootScope) {
        var deferred = $q.defer();
        $http.get('/api/loggedin').success(function(user) {
            $rootScope.errorMessage = null;
            if (user !== '0') {
                if(user.role == "Admin"){
                $location.url("/profile/admin");
                    deferred.resolve();
                }
                else{
                    $rootScope.currentUser = user;
                    deferred.resolve();
                }
            } else {
                deferred.reject();
                $location.url('/');
            }
        });
        return deferred.promise;
    }

    var checkAdminLoggedin = function($q, $timeout, $http, $location, $rootScope) {
        var deferred = $q.defer();
        $http.get('/api/loggedin').success(function(user) {
            $rootScope.errorMessage = null;
            if (user !== '0') {
                if(user.role == "Admin") {
                    $rootScope.currentUser = user;
                    deferred.resolve();
                }else {
                    deferred.reject();
                    $location.url('/profile');
                }
            } else {
                deferred.reject();
                $location.url('/login');
            }
        });
        return deferred.promise;
    }

})();
