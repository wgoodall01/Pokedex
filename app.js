var express = require('express');

//App parts
var routes = require("./routes");
var nocache = require('./lib/noCacheMiddleware');

var app = express();

//Configure Express
app.set("resource-cfg", {
    sass:{
        source: __dirname + "/res/scss",
        dest: __dirname + "/res/css-out",
        urlPrefix: "/r/css/",
        includePaths:["node_modules/bootstrap/scss"]
    },
    js: {
        urlPrefix: "/r/js",
        location: __dirname + "/res/js"
    }
});

app.set("middleware-cfg", {
    morganType:'dev'
});

app.set("db-cfg", {
    location: __dirname + "/data"
});

app.set('port', (process.env.PORT || 8080));
app.set('env', process.env.DEBUG 
    && ![].includes(process.env.DEBUG.toLowerCase()));
app.set("views", "./views");
app.set("view engine", "jade");
express.static.mime.define({
    "text/x-scss": ["scss"],
    "application/javascript": ["js"]
});

//Add middleware
require("./lib/addMiddleware")(app);

//Add resources
require("./lib/addRespources")(app);

//Start database
var db = require("./lib/database")(app);

//Keep track of last route
app.use(function(req, res, next){
    req.session.lastPage = req.originalUrl;
    next();
});

//Serve routes w/o cache
app.use(nocache, routes(db));

//Start server
app.listen(app.get('port'), function() {
    console.log('Listening on port ', app.get('port'));
});
