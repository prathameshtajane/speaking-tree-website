module.exports=function (app,model) {

    var bcrypt=require("bcrypt-nodejs");

    var passport      = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);


    var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
    var googleConfig = {

        clientID     : process.env.GOOGLE_CLIENT_ID,
        clientSecret : process.env.GOOGLE_CLIENT_SECRET,
        callbackURL  : process.env.GOOGLE_CALLBACK_URL

        /*clientID     : '19173067953-ed4ujiop68g3tfh2jihr44utkgctj6hq.apps.googleusercontent.com',
        clientSecret : 'f2gMNKSrQITQyXfokjmDViKC',
        callbackURL  : 'http://speaking-tree-website.herokuapp.com/google/auth/callback'*/
        /*callbackURL  : 'http://127.0.0.1:3000/google/auth/callback'*/
    };

    var multer = require('multer');
    var upload = multer({ dest: __dirname+'/../../public/uploads' });

    app.post ("/api/upload", upload.single('myFile'),uploadImage);
    app.post("/api/logout",logout);
    app.post("/api/login",passport.authenticate('local'),login);
    /*app.post("/api/user",createUser);*/
    app.post("/api/project/user",createUser);
    app.get("/api/user",findUser);
    app.get("/api/user/findallusers",findAllUser);
    app.get("/api/basicUserInfoById/:userId",findBasicUserInfoByUserId);
    app.get("/api/user/:userId",findUserById);
    app.post("/api/user/addfollower",addFollower);
    app.post("/api/user/:userId",updateUser);
    app.delete("/api/user/:userId",deleteUser);
    app.get("/api/following/:userName",getReviewsOfFollowingUsers);
    app.get("/api/loggedin",loggedin);
    /*app.get("/auth/google",googleLogin);*/
    app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

    app.get('/google/auth/callback',
        passport.authenticate('google', {
            successRedirect: '/#/profile',
            /*successRedirect: '/profile/'+ done.user._id,*/
            failureRedirect: '/#/login'
        }
        ));

    var userModel=model.userModel;
    var bookModel=model.bookModel;


    passport.use(new GoogleStrategy(googleConfig, googleStrategy));

    function googleStrategy(token, refreshToken, profile, done) {
        console.log("Profile from google");
        console.log(profile);
        userModel
            .findUserByGoogleId(profile.id)
            .then(
                function(user) {
                    if(user) {
                        return done(null, user);
                    } else {
                        var email = profile.emails[0].value;
                        var emailParts = email.split("@");
                        var newGoogleUser = {
                            username:  emailParts[0],
                            firstName: profile.name.givenName,
                            lastName:  profile.name.familyName,
                            email:     email,
                            profileurl:profile.photos[0].value,
                            google: {
                                id:    profile.id,
                                token: token
                            }
                        };
                        return userModel.createUser(newGoogleUser);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            )
            .then(
                function(user){
                    console.log("User created for google");
                    console.log(user);
                    return done(null, user);
                },
                function(err){
                    if (err) { return done(err); }
                }
            );
    }

    function loggedin(req,res) {
        console.log("Reached loggedin");
        res.send(req.isAuthenticated() ? req.user : '0');
    }


    /*function localStrategy(username,password,done) {
        console.log("Reached localStrategy");
        userModel
            .findUserByCredentails(username,password)
            .then(
                function(user) {
                    if (!user) { return done(null, false); }
                    return done(null, user);
                },
                function(err) {
                    if (err) { return done(err);   }
                }
            );
    }*/

    function localStrategy(username,password,done) {
        console.log("Reached localStrategy");
        userModel
            .findUserByUsername(username)
            .then(
                function(user){
                    console.log("Reached localStrategy2");
                    console.log(user);
                     if(user && bcrypt.compareSync(password,user.password)){
                        console.log("return done(null,user);");
                        return done(null,user);}else{
                        console.log("return done(null,false);");
                        return done(null,false);
                    }
                },
                function(err) {
                    if (err) { return done(err);   }
                }
            );
    }

    function login(req, res) {
        console.log("Reached login in user.service.server");
        var user = req.user;
        res.json(user);
    }

    function logout(req, res) {
        console.log("Reached logout in user.service.server");
        req.logOut();
        res.send(200);
    }

    function getReviewsOfFollowingUsers(req,res) {
        uname=req.params.userName;
        console.log("uname");
        console.log(uname);
        console.log("getReviewsOfFollowingUsers from user.service.server");
        userModel
            .findFollowingOfUserByUsername(uname)
            .then(
                function (status) {
                    var usernamelist=[];
                    for(var i=0;i<status.following.length;i++){
                        console.log(status.following[i].username);
                        usernamelist[i]=status.following[i].username;
                        console.log(usernamelist[i]);
                    }
                    console.log("For loop ended");
                    console.log("findFollowingOfUserByUsername"+ uname);
                    console.log(usernamelist);
                    bookModel
                        .findBookReviewsByReviewerNameList(usernamelist)
                        .then(
                            function (status) {
                                console.log(status);
                                res.json(status);
                            },
                            function (err) {
                                console.log(err);
                                res.json(err);
                            }
                        )

                },
                function (error){
                    console.log(error);
                }
            );

    }

    function findAllUser(req,res) {
        console.log("Reached  findAllUser from user.service.server");
        userModel
            .findAllUsers()
            .then(function (userlist) {
                    if(userlist){
                        if(userlist.length == 0){
                            res.sendStatus(404);
                        }
                        else{
                            res.json(userlist);
                        }
                    }
                    else{
                        res.sendStatus(404);
                    }},
                function (error) {
                    res.sendStatus(404);
                });
    }


    function findBasicUserInfoByUserId(req,res) {
        var userid=req.params.userId;
        console.log("Reached  findBasicUserInfoByUserId from user.service.server");
        userModel
            .findBasicUserInfoByUserId(userid)
            .then(function (user) {
                    if(user){
                        res.json(user);}
                    else{
                        res.sendStatus(404);
                    }
            },
                function (error) {
                    res.sendStatus(404);
                });
    }

    function addFollower(req,res){
        var sourceObject=req.body.sourceobject;
        var destinationObject=req.body.destinationobject;
        console.log("Reached addFollower from user.service.server");
        console.log("sourceObject");
        /*console.log(sourceObject);*/
        console.log("destinationObject");
        /*console.log(destinationObject);*/
        userModel
            .addFollower(sourceObject,destinationObject)
            .then(function (user) {
                    res.json(user);
                },
                function (error) {
                    res.sendStatus(500).send(error);
                });
    }

    function createUser(req,res){
        var newUserInfo=req.body;

        console.log("Create user from user.service.server");
        console.log(newUserInfo);

        var tempuser={};
        tempuser.username=newUserInfo.username;
        tempuser.firstName=newUserInfo.firstname;
        tempuser.lastName=newUserInfo.lastname;
        /*tempuser.password=newUserInfo.password;*/
        tempuser.password=bcrypt.hashSync(newUserInfo.password);
        tempuser.email=newUserInfo.email;
        tempuser.role=newUserInfo.role;

        userModel
            .createUser(tempuser)
            .then(function (user) {
                    /*req.login(user,function (err) {
                        if(err){
                            res.send(400);
                        }
                        else{
                            res.json(user);
                        }
                    });*/
                    res.json(user);
                },
                function (error) {
                    res.sendStatus(500).send(error);
                });
    }

    function findUser(req,res){
        var username = req.query.username;
        var password = req.query.password1;

        if(username && password){
            findUserByCredentails(req,res);
        }
        else{
            findUserByUsername(req,res);
        }
    }

    function findUserByUsername(req,res) {
        var username = req.query.username;
        userModel
            .findUserByUsername(username)
            .then(function (user) {
                    if(user){
                        if(user.length == 0){
                            res.sendStatus(404);
                        }
                        else{
                            res.json(user);
                        }
                    }
                    else{
                        res.sendStatus(404);
                    }},
                function (error) {
                    res.sendStatus(404);
                });
    }

    function updateUser(req,res){
        var userid=req.body.userId;
        var newUserInfo=req.body.userInfo;
        console.log(req.body);
        console.log("Calling updateUser user.service.server.js");
        userModel
            .updateUser(userid,newUserInfo)
            .then(function (user) {
                    res.json(user);
                    /*res.sendStatus(200);*/
                },
                function (err) {
                    res.sendStatus(200);
                });
    }

    function findUserById(req,res){
        var userid=req.params.userId;
        console.log("Calling findUserById user.service.server.js");
        console.log(userid);
        userModel
            .findUserById(userid)
            .then(function (user) {
                    if(user){
                        res.json(user);
                    }
                    else{
                        res.sendStatus(404);
                    }},
                function (error) {
                    res.sendStatus(404);
                });

    }


    function findUserByCredentails(req,res){
        var queryUserName=req.query.username;
        var queryUserPassword=req.query.password;

        userModel
            .findUserByCredentails(queryUserName,queryUserPassword)
            .then(function (user) {
                    if(user){
                        if(user.length == 0){
                            res.sendStatus(400);
                        }
                        else{
                            res.json(user);
                        }
                    }
                    else{
                        res.sendStatus(404);
                    }},
                function (error) {
                    res.send(error);
                    /*res.sendStatus(404);*/
                });

    }

    function deleteUser(req,res) {
        var userid = req.params.userId;
        userModel
            .deleteUser(userid)
            .then(function (user) {
                    res.sendStatus(200);
                },
                function (err) {
                    res.sendStatus(200);
                });
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }
    
    function uploadImage(req,res) {
        var myFile=req.file;
        var userid=req.body.userid;
        var filename= myFile.filename;     // new file name in upload folder

        var imgUrl="../../../../uploads/"+filename;
        console.log("Reached uploadImage from user.service.server");

        userModel
            .updateProfilePicByUserId(imgUrl,userid)
            .then(function (user) {
                    res.redirect("/#/profile/"+userid);
                },
                function (err) {
                    res.sendStatus(200);
                });
    }


    /*function findfollowersOfUser(req,res){
        var userId=req.params.userId;
        console.log("Reached findfollowersOfUser in user.service.server");
            userModel
                .findUserById(userId)
                .then(function (user) {
                    res.send(user);
                },
                    function (err) {
                        res.send(404).status("Error while retreiving followers list");
                    }
                )

    }*/
};

