module.exports=function(app,mongoose){

    var q = require('q');

    var userSchema=require('../user/user.schema.server');
    var userModel=mongoose.model('userModel',userSchema);

    var api={
        createUser:createUser,
        findAllUsers:findAllUsers,
        findBasicUserInfoByUserId:findBasicUserInfoByUserId,
        findUserByUsername:findUserByUsername,
        findUserById:findUserById,
        findUserByCredentails:findUserByCredentails,
        deleteUser:deleteUser,
        updateUser:updateUser,
        findfollowersOfUser:findfollowersOfUser,
        findfollowingListByUserId:findfollowingListByUserId,
        addFollower:addFollower,
        findFollowingOfUserByUsername:findFollowingOfUserByUsername,
        findUserByGoogleId:findUserByGoogleId,
        updateProfilePicByUserId:updateProfilePicByUserId
    };
    return api;

    function updateProfilePicByUserId(imageUrl,userId) {
        var deferred = q.defer();
        console.log("updateProfilePicByUserId from user.model.server");

        userModel.update({_id:userId},{$set:{"profileurl":imageUrl}},function (err,status){
            if(err){
                console.log("Recieved error at model while updateing profileurl");
                console.log(err);
                deferred.reject(new Error(err));
            }else{
                console.log("User profileurl updation succesfull at model level");
                console.log(status);
                deferred.resolve(status);
            }
        });
        return deferred.promise;
    }
    
    function findUserByGoogleId(googleId) {
        var deferred = q.defer();
        console.log("findFollowersOfUserByUsername from user.model.server");
        userModel.findOne({"google.id":googleId},function (err,user){
            if(err){
                deferred.reject(new Error(err));
            }
            else{
                deferred.resolve(user);
            }
        });
        return deferred.promise;
    }

    function findFollowingOfUserByUsername(username){
        var deferred = q.defer();
        console.log("findFollowersOfUserByUsername from user.model.server");

        userModel.find({"username" : username},{"following.username": 1,"_id":0},function (err,status) {
            if(err){
                deferred.reject(new Error(err));
            }
            else{
                /*console.log(status[0]);*/
                deferred.resolve(status[0]);
            }
        });
        return deferred.promise;
    }

    function createUser(newUser){

        /*return userModel.create(newUser);*/

        var deferred = q.defer();
        console.log("Create user from user.model.server");
        console.log(newUser);
        console.log("calling createUser from user.model.server.js");
        userModel.create(newUser,function (err,status) {
            if(err){
                console.log("Error occured while creating user");
                console.log(err);
                deferred.reject(new Error(err));
            }else{
                console.log("Succesfull while creating user");
                console.log(status);
                deferred.resolve(status);
            }
        });
        return deferred.promise;
    }

    function findUserByUsername(username){
        var deferred = q.defer();
        console.log("calling findUserByUsername from user.model.server.js");
        userModel.findOne({username:username},function (err,status) {
            if(err){
                deferred.reject(new Error(err));
            }else{
                deferred.resolve(status);
            }
        });
        return deferred.promise;
    }

    function findBasicUserInfoByUserId(userid){
        var deferred = q.defer();
        console.log(userid);
        if(!(userid instanceof mongoose.Types.ObjectId)){
            userid=mongoose.Types.ObjectId(userid);
        }
        console.log(userid);
        console.log("calling findBasicUserInfoByUsername from user.model.server.js");
        userModel.findOne({_id:userid},function (err,status) {
            if(err){
                deferred.reject(new Error(err));
            }else{
                var basicUserInfo={};
                basicUserInfo.username=status.username;
                basicUserInfo.firstName=status.firstName;
                basicUserInfo.lastName=status.lastName;
                basicUserInfo.email=status.email;
                basicUserInfo.phone=status.phone;
                basicUserInfo.followers=status.followers;
                basicUserInfo.following=status.following;
                basicUserInfo.books=status.books;
                basicUserInfo.role=status.role;
                basicUserInfo.dateCreated=status.dateCreated;
                deferred.resolve(basicUserInfo);
            }
        });
        return deferred.promise;
    }


    function findUserById(userid) {
        var deferred = q.defer();
        console.log("calling findUserById from user.model.server.js");
        if(!(userid instanceof mongoose.Types.ObjectId)){
            userid=mongoose.Types.ObjectId(userid);
        }
        userModel.findOne({_id:userid},function (err,status) {
            if(err){
                deferred.reject(new Error(err));
            }else{
                console.log("Status");
                console.log(status);
                deferred.resolve(status);
            }
        });
        return deferred.promise;
    }

    function findUserByCredentails(username1,password1){
        var deferred = q.defer();
        console.log("calling findUserByCredentails from user.model.server.js");
        console.log("username is "+username1);
        console.log("password is "+password1);
        userModel.findOne({username:username1,password:password1},function (err,user) {
            if(err){
                deferred.reject(new Error(err));
            }else{
                deferred.resolve(user);
            }
        });
        return deferred.promise;
    }

    function deleteUser(userid) {
        var deferred = q.defer();
        console.log("calling deleteUser from user.model.server.js");
        userModel.remove({_id:userid},function (err,status) {
            if(err){
                deferred.reject(new Error(err));
            }else{
                deferred.resolve(status);
            }
        });
        return deferred.promise;

    }

    function updateUser(userid,userInfo) {
        var deferred = q.defer();
        console.log("userid for userInfo modification");
        console.log(userInfo);
        usersEmail=userInfo.email;
        usersFirstName=userInfo.firstname;
        usersLastName=userInfo.lastname;
        usersPassword=userInfo.password;
        /*user=ObjectId.fromString(userid);*/
        console.log("calling updateUser from user.model.server.js");
        userModel.update({_id:userid},{$set:{"firstName":usersFirstName,"lastName":usersLastName,"email":usersEmail,"password":usersPassword}},function (err,status){
            if(err){
                console.log("Recieved error at model while updateing userinfo");
                console.log(err);
                deferred.reject(new Error(err));
            }else{
                console.log("User infor updation succesfull at model level");
                console.log(status);
                /*deferred.resolve(findUserById(userid));*/
                deferred.resolve(status);
            }
        });
        return deferred.promise;
    }


    function findfollowersOfUser(userid){
        var deferred = q.defer();
        console.log("calling findfollowersOfUser from user.model.server.js");
        userModel.findOne({_id:userid},function (err,user) {
            if(err){
                deferred.reject(new Error(err));
            }else{
                deferred.resolve(user);
            }
        });
        return deferred.promise;
    }

    function findfollowingListByUserId(userid) {
        var deferred = q.defer();
        console.log("calling findfollowingListByUserId from user.model.server.js");
        console.log(userid);
        userModel.find({_id:userid},{"following._id":1,"_id": 0},function (err,followinglist) {
            if(err){
                deferred.reject(new Error(err));
            }
            else{
                console.log("Sending this followinglist from user.model.server.js");
                /*console.log(followinglist[0].followers);*/
                console.log(followinglist);
                deferred.resolve(followinglist);
            }
        });
        return deferred.promise;
    }

    function addFollower(sourceObject,destinationObject) {
        var deferred = q.defer();
        console.log("calling addFollower from user.model.server.js");
        console.log("sourceObject");
        console.log(sourceObject);
        console.log("destinationObject");
        console.log(destinationObject);

        userModel.update({"username":sourceObject.username},{$push :{"following":destinationObject}},function (err,followinglist){
            if(err){
                console.log("Failure1");
                console.log(err);
                deferred.reject(new Error(err));
            }
            else{
                userModel.update({"username":destinationObject.username},{$push :{"followers":sourceObject}},function (err,updateStatus) {
                    if (err) {
                        console.log("Failure2");
                        console.log(err);
                        deferred.reject(new Error(err));
                    }
                    else {
                        console.log("Sucess");
                        console.log(updateStatus);
                        deferred.resolve(updateStatus);
                    }
                });
            }
        });
        return deferred.promise;

    }

    function findAllUsers() {
        var deferred = q.defer();
        userModel.find({},{"password":0,"email":0,"phone":0,"following":0,"followers":0,"books":0},function (err,allUserList){
            if(err){
                deferred.reject(new Error(err));
            }
            else{
                deferred.resolve(allUserList);
            }
        });
        return deferred.promise;
    }
    /*db.user.update({'_id':ObjectId("58e44e840376bc22c11d0f35")},{$push : {'followers': "123"}})*/

};
