module.exports=function (app) {
    require("./services/user.service.server")(app,model);
    require("./services/book.service.server")(app,model);
    require("./services/article.service.server")(app,model);
    console.log("Server Initialised Succesfully");
};
