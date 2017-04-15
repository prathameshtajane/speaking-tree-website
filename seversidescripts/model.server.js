
module.exports=function (app) {
    var mongoose = require('mongoose');
    var userModel=require('./models/user/user.model.server')(app,mongoose);
    var bookModel=require('./models/book/book.model.server')(app,mongoose);
    var articleModel=require('./models/article/article.model.server')(app,mongoose);

    var model={
        userModel:userModel,
        bookModel:bookModel,
        articleModel:articleModel
    };
    require('./services/user.service.server')(app,model);
    require('./services/book.service.server')(app,model);
    require('./services/article.service.server')(app,model);
    console.log("Server Restarted!");

    /*userModel
        .findFollowersOfUserByUsername("pratham")
        .then(
            function (status) {
                var usernamelist=[];
                for(var i=0;i<status.followers.length;i++){
                    console.log(status.followers[i].username);
                    usernamelist[i]=status.followers[i].username;
                    console.log(usernamelist[i]);
                }
                bookModel
                    .findBookReviewsByReviewerNameList(usernamelist)
                    .then(
                        function (status) {
                            console.log(status);
                        },
                        function (err) {
                            console.log(err);
                        }
                    )

            },
            function (error){
                console.log(error);
            }
        );*/

    /*userModel.createUser(
        {

            "username" : "admin",
            "password" : "admin",
            "firstName" : "admin",
            "lastName" : "admin",
            "email" : "admin@gmail.com",
            "phone" : "1234",
            "role" : "admin",
            "books" : [ ],
            "following" : [ ],
            "followers" : [],
            "__v" : 0
        }
    )*/

    /*userModel.createUser(
     {
         username: 'asd',
         firstname: 'asd',
         lastname: 'asd',
         password1: 'asd',
         password2: 'asd',
         role: 'Reader',
         email: 'asd@asd.com'
     }
     );*/




    /*bookModel.addBookReviewByBookISBN({
        'bookname' : "Five point someone",
        'isbn' : "9788129135490",
        'authorname' : "Chetan Bhagat",
        'imgurl' : "https://pbs.twimg.com/profile_images/671865418701606912/HECw8AzK.jpg",
        'reviewsub' : "I hate this book",
        'review' : "Five Point Someone is Chetan Bhagat's debut novel which revolves around the lives of Ryan, Alok, and Hari. The three lads become close friends while trying hard to survive in an exceedingly competitive environment. The three boys join IIT with a passion to excel and come out successfully as the best graduates. However, their life turns upside down when their grades fall lower than they had ever expected. Meanwhile, Hari falls in love with his professor's daughter, and Alok and Ryan cannot stop disputing each other. Five Point Someone was successfully able to strike a chord with the millions of youngsters across India. Hari, Alok and Ryan have to deal with unpleasant and cynical teachers, assignments and projects, stress of unending examinations, and a stringent academic schedule. Will they be able to survive the IITs? Or will they succumb to the tedious and age-old education system of India? Five Point Someone has been adapted into hugely successful motion pictures both in Tamil and Hindi",
        'reviewerid' : '58e44e4580ee7d22af649578',
        'reviewername': "prathamesh"
    });*/
    /*bookModel.findBookReviewByReaderId('58e0234c26e93c4e794a8586');*/
    /*var id = mongoose.Types.ObjectId('58e0234c26e93c4e794a8586');
    /!*console.log(id);*!/
    var id2='58e0234c26e93c4e794a8586';
     /!*console.log((id2 instanceof mongoose.Types.ObjectId));*!/
    userModel.findUserById(id2);*/

    /*userModel.createUser({
        'username':"prathamesha",
        'password':"qwe",
        'firstName':"prathameshA",
        'lastName':"tajaneA",
        'email':"ptajaneA@gmail.com",
        'phone':"1234A",
        'followers':[],
        'following':[],
        'books':[],
        'role':'author'
    })*/


    /*userModel.addFollower({
        'username':"prathamesha",
        'password':"qwe",
        'firstName':"prathameshA",
        'lastName':"tajaneA",
        'email':"ptajaneA@gmail.com",
        'phone':"1234A",
        'followers':[],
        'following':[],
        'books':[],
        'role':'author'
    },
        {
            "username" : "prathamesh",
            "password" : "qwe",
            "firstName" : "prathamesh",
            "lastName" : "tajane",
            "email" : "ptajane@gmail.com",
            "phone" : "1234",
            "role" : "reader",
            "books" : [ ],
            "following" : [ ],
            "followers" : [ ],
            "__v" : 0
        })*/

    /*userModel.findBasicUserInfoByUserId('58e44e840376bc22c11d0f35');*/



    /*articleModel.addBookArticleByBookISBN(
        {
            'bookisbn' : '9788129135490',
            'authorid':'58e44e840376bc22c11d0f35',
            'authorusername':'prathamesha',
            'articletitle':'Article for Five point someone second article by prathamesha',
            'articlecontent':'aaaaaaaaaassssssssdddddddddffff',
            'userlikeids':[],
            'userdislikeids':['58e0234c26e93c4e794a8586']
        }
    );

    articleModel.addBookArticleByBookISBN(
        {
            'bookisbn' : '9788129135490',
            'authorid':'58e44e840376bc22c11d0f35',
            'authorusername':'prathamesha',
            'articletitle':'Article for Five point someone third article by prathamesha',
            'articlecontent':'aaaaaaaaaassssssssdddddddddffff Third',
            'userlikeids':[],
            'userdislikeids':['58e0234c26e93c4e794a8586']
        }
    )*/

    /*articleModel.findBookArticleListByAuthorId('58e44e840376bc22c11d0f35');*/
};
