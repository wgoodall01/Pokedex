var morgan = require('morgan');
var session = require('express-session');
var NedbStore = require("connect-nedb-session")(session);
var flash = require("express-flash");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var compression = require('compression');

module.exports = function(app){
    var cfg = app.get('middleware-cfg');
    
    // ----------   Logging
    app.use(morgan(cfg.morganType));

    //Compression
    app.use(compression());


    // ----------   Sessions
    app.use(cookieParser());
    app.use(session({
        secret: process.env.SESSION_SECRET,
        key: 'sid',
        cookie: {secure: false}
    }));
    app.use(flash());

    // ----------   Res.cancel > redirect to referer, keep track of referrer server-side through sessions
    app.use(function(req, res, next){
        var last = req.session.cancelPage || "/";
        res.cancel = function(){
            res.redirect(last);
            res.end();
        };
        req.session.cancelPage = req.originalUrl;

        next();
    });

    
    // ----------   Flash on all renders
    app.use(flash());
    app.use(function(req, res, next){
        //Automatically add `info` and `error` flashes to the render function
        var _render = res.render;
        res.render = function(){
            var locals = arguments[1] || {};
            locals.flashMessages = {
                info: req.flash('info') || [],
                errors: req.flash('error') || [],
                meh: req.flash('meh') || []
            };
            arguments[1] = locals;
            _render(...arguments);
        };
        next();
    });

    // ----------   Body parser
    app.use(bodyParser.urlencoded());
};
