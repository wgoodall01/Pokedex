var express = require("express");
var sass = require('node-sass-middleware');
var minifyHTML = require("express-minify-html");

module.exports = function(app){
    var cfg = app.get("resource-cfg");
    
    // ----------   Compile and serve SASS
    app.use(cfg.sass.urlPrefix, sass({
         src: cfg.sass.source,
        dest: cfg.sass.dest,
        outputStyle:'compressed',
        prefix: cfg.sass.urlPrefix,
        includePaths:cfg.sass.includePaths
    }));
    
    app.use(cfg.sass.urlPrefix, express.static(cfg.sass.dest));
    
    
    // ----------   Minify HTML
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
    
    
    //Serve js
    app.use(cfg.js.urlPrefix, express.static(cfg.js.location));
};
