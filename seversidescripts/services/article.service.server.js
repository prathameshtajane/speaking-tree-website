module.exports=function (app,model) {
    app.get("/api/articles/findallarticles",findAllBookArticles);
    app.get("/api/articles/book/:isbnId",findBookArticleListByBookISBN);
    app.post("/api/book/:isbn/newarticle",addBookArticleByBookISBN);
    app.get("/api/author/:aid/articles",findBookArticleListByAuthorId);
    app.delete("/api/articles/:aid",deleteBookArticleListByArticleId);
    app.get("/api/articles/:artid",findBookByArticleId);
    app.post("/api/articles/:artid",updateArticle);
    app.get("/api/followingarticles/:userName",findArticlesByAuthorNameList);


    var userModel=model.userModel;
    var bookModel=model.bookModel;
    var articleModel=model.articleModel;

    function findAllBookArticles(req,res) {
        console.log("Reached  findAllBookArticles from article.service.server");
        articleModel
            .findAllBookArticles()
            .then(function (articlelist) {
                    if(articlelist){
                        if(articlelist.length == 0){
                            res.sendStatus(404);
                        }
                        else{
                            res.json(articlelist);
                        }
                    }
                    else{
                        res.sendStatus(404);
                    }},
                function (error) {
                    res.sendStatus(404);
                });
    }


    function findArticlesByAuthorNameList(req,res) {
        uname=req.params.userName;
        console.log("uname");
        console.log(uname);
        console.log("findArticlesByAuthorNameList from article.service.server");
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
                    console.log("findArticlesByAuthorNameList"+ uname);
                    console.log(usernamelist);
                    articleModel
                        .findArticlesByAuthorNameList(usernamelist)
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


    function updateArticle(req,res) {
        var articleid=req.params.artid;
        console.log("Reached updateArticle from article service server");
        console.log(articleid);
        articleObj=req.body;
        articleModel
            .updateArticle(articleid,articleObj)
            .then(function (updatedArticle) {
                    res.json(updatedArticle);
                },
                function (error) {
                    res.json(error);
                })

    }


    function findBookByArticleId(req,res) {
        var articleid=req.params.artid;
        articleModel
            .findBookByArticleId(articleid)
            .then(function (articleinfo) {
                    res.json(articleinfo);
                },
                function (error) {
                    res.json(error);
                })
    }

    function deleteBookArticleListByArticleId(req,res){
        var aid=req.params.aid;
        articleModel
            .deleteBookArticleListByArticleId(aid)
            .then(function (status) {
                res.json(status);
            },
            function (error) {
                res.json(error);
            })
    }


    function findBookArticleListByAuthorId(req,res) {
        var aid=req.params.aid;
        console.log("Reached  findBookArticleListByAuthorId from user.service.server");
        articleModel
            .findBookArticleListByAuthorId(aid)
            .then(function (articlelist) {
                    if(articlelist){
                        res.json(articlelist);}
                    else{
                        res.sendStatus(404);
                    }
            },
                function (error) {
                    res.sendStatus(404).send(error);
                });
    }

    function findBookArticleListByBookISBN(req,res) {
        var isbn=req.params.isbnId;
        console.log("Reached  findBookArticleListByBookISBN from user.service.server");
        console.log(isbn);
        articleModel
            .findBookArticleListByBookISBN(isbn)
            .then(function (articlelist) {
                    if(articlelist){
                        res.json(articlelist);}
                    else{
                        res.sendStatus(404);
                    }
                },
                function (error) {
                    console.log("findBookArticleListByBookISBN Error");
                    res.sendStatus(404).send(error);
                });
    }


    function addBookArticleByBookISBN(req,res){
        var newArticleInfo=req.body;
        console.log("addBookArticleByBookISBN from user.service.server");
        console.log(newArticleInfo);
        articleModel
            .addBookArticleByBookISBN(newArticleInfo)
            .then(function (article) {
                    res.json(article);
                },
                function (error) {
                    res.sendStatus(500).send(error);
                });
    }

    /*function addFollower(req,res){
        var sourceObject=req.body.sourceobject;
        var destinationObject=req.body.destinationobject;
        console.log(req.body);
        console.log("Reached addFollower from user.service.server");
        console.log("sourceObject");
        console.log(sourceObject);
        console.log("destinationObject");
        console.log(destinationObject);
    }*/


    /*function findUser(req,res){
        var username = req.query.username;
        var password = req.query.password1;

        if(username && password){
            findUserByCredentails(req,res);
        }
        else{
            findUserByUsername(req,res);
        }
    }*/

    /*function findUserByUsername(req,res) {
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
    }*/

    /*function updateUser(req,res){
        var userid=req.body.userID;
        var newUserInfo=req.body;
        console.log("Calling updateUser user.service.server.js");
        userModel
            .updateUser(userid,newUserInfo)
            .then(function (user) {
                    res.json(user);
                    /!*res.sendStatus(200);*!/
                },
                function (err) {
                    res.sendStatus(200);
                });
    }*/

    /*function findUserById(req,res){
        var userid=req.params.userId;
        console.log("Calling findUserById user.service.server.js");
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

    }*/


    /*function findUserByCredentails(req,res){
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
                    /!*res.sendStatus(404);*!/
                });

    }*/

    /*function deleteUser(req,res) {
        var userid = req.params.userId;
        userModel
            .deleteUser(userid)
            .then(function (user) {
                    res.sendStatus(200);
                },
                function (err) {
                    res.sendStatus(200);
                });
    }*/


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

