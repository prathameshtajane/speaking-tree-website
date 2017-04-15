/**
 * Created by prathamesh on 3/27/17.
 */
/**
 * Created by prathamesh on 2/7/17.
 */
(function () {
    angular
        .module('webdevProject')
        .factory('userService',userService);

    function userService($http) {

        var api = {
            "findUserById" : findUserById,
            "findBasicUserInfoByUserId":findBasicUserInfoByUserId,
            "findUserByCredentails" : findUserByCredentails,
            "findAllUsers":findAllUsers,
            "createUser" : createUser,
            "updateUser" : updateUser,
            "findUserByUserName" : findUserByUserName,
            "deleteUser" : deleteUser,
            "addFollower":addFollower,
            "getReviewsOfFollowingUsers":getReviewsOfFollowingUsers,
            "logout":logout
        };
        return api;


        /*
         app.get("/api/user/follwing?user=username",getReviewsOfFollowingUsers);
         */


        function logout() {
            var req = {
                method: 'POST',
                url: '/api/logout',
                headers: {
                    'Content-Type': "application/json",
                    'Accept':"application/json"
                },
                data: null
            };
            return $http(req);
        }

        function addFollower(sourceobj,destinationobj) {
            console.log("Reached addFollower from user.service.client");
            console.log(sourceobj);
            console.log(destinationobj);
            /*return $http.put("/api/user/addfollower",sourceobj,destinationobj);*/
            var req = {
                method: 'POST',
                url: '/api/user/addfollower',
                headers: {
                    'Content-Type': "application/json",
                    'Accept':"application/json"
                },
                data: {"sourceobject":sourceobj,"destinationobject": destinationobj}
            };
            return $http(req);
        }

        function findBasicUserInfoByUserId(userid) {
            console.log("Reached addFfindBasicUserInfoByUserIdollower from user.service.client");
            console.log(userid);
            return $http.get("/api/basicUserInfoById/"+userid);
        }


        function findAllUsers(){
            console.log("Reached findAllUsers from user.service.client");
            return $http.get("/api/user/findallusers");
        }

        function findUserByCredentails(username,password){
            var req = {
                method: 'POST',
                url: '/api/login',
                headers: {
                    'Content-Type': "application/json",
                    'Accept':"application/json"
                },
                data: {"username":username,"password": password}
            };
            return $http(req);
            /*console.log("findUserByCredentails");
            console.log(username);
            console.log(password);
            return $http.get("/api/user?username="+username+"&password="+password);*/
        }

        /*function findUserByCredentails(user){
            console.log("findUserByCredentails from user.service.client");
            console.log(user);
            return $http.post("/api/login",user);
        }*/


        function createUser(newUserObj){
            console.log(newUserObj);
            var req = {
                method: 'POST',
                url: '/api/project/user',
                headers: {
                    'Content-Type': "application/json"
                },
                data: JSON.stringify(newUserObj)
            };
            return $http(req);
            /*return $http.post("/api/project/user",newUserObj,req.header("Content-Type", "application/json"));*/
        }

        function findUserById(uid){
            console.log("Reached findUserById from user.service.client");
            return $http.get("/api/user/"+uid);
        }

        function getReviewsOfFollowingUsers(username){
            console.log("Reached getReviewsOfFollowingUsers from user.service.client");
            console.log(username);
            return $http.get("/api/following/"+username);
        }

        function updateUser(userid,newUserInfo){
            console.log("Reached updateUser from user.service.client");
            var req = {
                method: 'POST',
                url: '/api/user/'+userid,
                headers: {
                    'Content-Type': "application/json",
                    'Accept':"application/json"
                },
                data: {"userInfo": newUserInfo,"userId": userid}
            };
            return $http(req);

            /*return $http.put("/api/user/"+userid,newUserInfo);*/
        }

        function findUserByUserName(inp_username){
            return $http.get("/api/user?username="+inp_username);
        }

        function deleteUser(userid){
            return $http.delete("/api/user/"+userid);
        }



        /*function findfollowersOfUser(userid){
            console.log("Reached findfollowersOfUser from user.service.client");
            return $http.get("/api/user/userid/"+userid+"/followers");
        }*/

    }
})();
