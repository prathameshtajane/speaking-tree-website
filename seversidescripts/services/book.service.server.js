module.exports=function (app,model) {

    app.get("/api/book/rbooks/:userId",findBookReviewByReaderId);
    app.get("/api/user/:userId/reviewlist",findBookReviewByReadersList);
    app.get("/api/bookisbn/:isbn",findBookReviewByBookISBN);
    app.get("/api/book/findallreviews",findAllBookReviews);
    app.post("/api/user/",addBookReviewByBookISBN);
    app.delete("/api/review/:reviewId",deleteBookReviewByReviewId);

    var userModel=model.userModel;
    var bookModel=model.bookModel;


    function deleteBookReviewByReviewId(req,res) {
        var reviewId = req.params.reviewId;
        console.log("Reached deleteBookReviewByReviewId from book.service.server");
        bookModel
            .deleteBookReviewByReviewId(reviewId)
            .then(function (status) {
                    res.json(status);
                },
                function (error) {
                    res.sendStatus(500).send(error);
                });
    }

    function findAllBookReviews(req,res) {
        console.log("Reached  findAllBookReviews from book.service.server");
        bookModel
            .findAllBookReviews()
            .then(function (reviewlist) {
                    if(reviewlist){
                        if(reviewlist.length == 0){
                            res.sendStatus(404);
                        }
                        else{
                            res.json(reviewlist);
                        }
                    }
                    else{
                        res.sendStatus(404);
                    }},
                function (error) {
                    res.sendStatus(404);
                });
    }

    function addBookReviewByBookISBN(req,res){
        var newBookReviewInfo=req.body;
        console.log("addBookReviewByBookISBN from book.service.server");
        console.log(newBookReviewInfo);

        bookModel
            .addBookReviewByBookISBN(newBookReviewInfo)
            .then(function (bookreview) {
                    res.json(bookreview);
                },
                function (error) {
                    res.sendStatus(500).send(error);
                });
    }

    function findBookReviewByBookISBN(req,res){
        var isbnId = req.params.isbn;
        console.log("findBookReviewByBookISBN from book.service.server"+isbnId);
        bookModel
            .findBookReviewByBookISBN(isbnId)
            .then(function (reviewlist) {
                if(reviewlist){
                    if(reviewlist.length == 0){
                        res.send(404).status("No reviews found");
                    }
                    else{
                        res.json(reviewlist);
                    }
                }
            })

    }

    function findBookReviewByReaderId(req,res){
        var readerid = req.params.userId;
        console.log("findBookReviewByReaderId from book.service.server"+readerid);
        bookModel
            .findBookReviewByReaderId(readerid)
            .then(function (booklist) {
                if(booklist){
                    if(booklist.length == 0){
                        res.sendStatus(404);
                    }
                    else{
                        res.json(booklist);
                    }
                }
            })
    }

    function findBookReviewByReadersList(req,res){
        var userid = req.params.userId;
        console.log("Printing console.log(userid) at book.service.server");
        console.log(userid);
        console.log("Reached findBookReviewByReadersList in book.service.server");
        userModel
            .findfollowingListByUserId(userid)
            .then(function (followinglist) {
                if(followinglist){
                    if(followinglist.length == 0){
                        console.log(followinglist);
                        res.sendStatus(404);
                    }
                    else{
                        for(i=0;i<followinglist.length;i++){
                            followingIdList.push(following[i]._id);
                        }
                        console.log("Reached findBookReviewByReadersList from book.service.server");
                        console.log(followingIdList);

                        bookModel
                            .findBookReviewByReadersList(followingIdList)
                            .then(function (bookReviewedObjectList) {
                                if(bookReviewedObjectList){
                                    if(bookReviewedObjectList.length == 0){
                                        res.sendStatus(404);
                                    }
                                    else{
                                        res.json(bookReviewedObjectList);
                                    }
                                }
                            })
                    }
                }
            })
    }


    /*function deleteBookReviewByISBN(req,res) {
        var isbn = req.params.isbn;
        userModel
            .deleteBookReviewByISBN(userid)
            .then(function (user) {
                    res.sendStatus(200);
                },
                function (err) {
                    res.sendStatus(200);
                });
    }*/

};


