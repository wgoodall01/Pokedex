var express = require('express');
var morgan = require('morgan');
var routes = require("./routes");
var Datastore = require('nedb');
var sass = require('node-sass-middleware');
var minifyHTML = require("express-minify-html")

var app = express();

//Configure Express
app.set('port', (process.env.PORT || 8080));
app.set("views", "./views");
app.set("view engine", "jade");
express.static.mime.define({
    "text/x-scss": ["scss"],
    "application/javascript": ["js"]
});

//Logging
app.use(morgan('dev'));

//Compile SASS
var SASS_SRC = __dirname + "/res/scss";
var SASS_DEST = __dirname + "/res/css-out";
var SASS_PREFIX = "/r/css";

app.use(SASS_PREFIX, sass({
    src:SASS_SRC,
    dest:SASS_DEST,
    outputStyle:'compressed',
    prefix: SASS_PREFIX
}));
app.use(SASS_PREFIX, express.static(SASS_DEST));

//Minify HTML
app.use(minifyHTML({
    override:      true,
    htmlMinifier: {
        removeComments:            true,
        collapseWhitespace:        true,
        collapseBooleanAttributes: true,
        removeAttributeQuotes:     true,
        removeEmptyAttributes:     true,
        minifyJS:                  true
    }
}));

// Disable any kind of browser caching
app.use(function(req, res, next) {
    if(!/^\/r\//i.test(req.path)){
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
        res.header('Expires', '-1');
        res.header('Pragma', 'no-cache');
        next();
    }
});

//Serve js
app.use("/r/js", express.static(__dirname + "/res/js"));

//Init database
var db = {
    pokemon: new Datastore({filename:__dirname + "/data/pokemon.db", autoload:true}),
    trainers: new Datastore({filename:__dirname + "/data/trainers.db", autoload:true})    
};

//Parse form data on routes
app.use(require('body-parser').urlencoded());

//Serve routes
app.use(routes(db));


app.listen(app.get('port'), function() {
    console.log('Listening on port ', app.get('port'));
});
