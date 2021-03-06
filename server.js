var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));




var passport      = require('passport');
var cookieParser  = require('cookie-parser');
var session       = require('express-session');

app.use(session({
    secret: 'this is the secret', // process.env.SESSION_SECRET
    resave: true,
    saveUninitialized: true
}));

app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));

require ("./test/app.js")(app);
require ("./seversidescripts/model.server")(app);

/*require("./seversidescripts/app.js")(app);*/
/*require("./assignment-pri/model/models.server")(app);*/
/*require ("./assignment-pri/app.js")(app);*/
/*require("./assignment-pri/model/models.server")(app);*/

console.log("Server Restartedt:server.js");

var port = process.env.PORT || 3000;

app.listen(port);