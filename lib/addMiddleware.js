var morgan = require('morgan');
var flash = require('express-flash');
var session = require('express-session');
var NedbStore = require("connect-nedb-session")(session);
var flash = require("express-flash");
var bodyParser = require("body-parser");

module.exports = function(app){
    var cfg = app.get('middleware-cfg');
    
    // ----------   Logging
    app.use(morgan(cfg.morganType));


    // ----------   Sessions
    app.use(session({
        secret: process.env.SESSION_SECRET,
        resave:false,
        saveUninitialized: true,
        store: new NedbStore({filename: require.main.__dirname + "/data/session.db"})
    }));
    
    
    // ----------   Flash
    app.use(flash());

    // ----------   Body parser
    app.use(bodyParser.urlencoded());
};
