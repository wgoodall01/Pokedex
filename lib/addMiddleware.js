var morgan = require('morgan');
var session = require('express-session');
var NedbStore = require("connect-nedb-session")(session);
var flash = require("express-flash");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");

module.exports = function(app){
    var cfg = app.get('middleware-cfg');
    
    // ----------   Logging
    app.use(morgan(cfg.morganType));


    app.use(cookieParser());
    
    // ----------   Sessions
    // app.use(cookieParser(process.env.SESSION_SECRET));
    // app.use(session({
    //     secret: process.env.SESSION_SECRET,
    //     resave:false,
    //     saveUninitialized: true,
    //     cookie: {maxAge:6000},
    //     store: new NedbStore({filename: app.get('db-cfg').location + "/session.db"})
    // }));

    app.use(session({
        secret: process.env.SESSION_SECRET,
        key: 'sid',
        cookie: {secure: false}
    }));

    // app.use(session({ cookie: { maxAge: 60000 }}));
    app.use(flash());
    
    
    // ----------   Flash on all renders
    app.use(flash());
    app.use(function(req, res, next){
        //Automatically add `info` and `error` flashes to the render function
        var _render = res.render;
        res.render = function(){
            var locals = arguments[1] || {};
            locals.flashMessages = {
                info: req.flash('info') || [],
                errors: req.flash('error') || []
            };
            arguments[1] = locals;
            _render(...arguments);
        };
        next();
    });

    // ----------   Body parser
    app.use(bodyParser.urlencoded());
};
