var express = require('express');
var normalizeDbKeys = require.main.require("./lib/normalizeDbKeys.js");

module.exports = function(db){
    var routes = {};

    routes.list = function(req, res){
        var queryFields = normalizeDbKeys(req.query);
        var regexFields = {};
        
        //Convert normal fields to regex
        for(key in queryFields){
            if (queryFields.hasOwnProperty(key)){
                regexFields[key] = new RegExp(queryFields[key], 'i');
            }
        }
        
        db.pokemon.find(regexFields, function(err, docs){
            //If the card is the only one, redirect to its listing
            if(docs.length == 1){
                res.redirect("/view/"+docs[0]._id);
            }else {
                res.render('list.jade', {cards: docs, filterCard:queryFields})
            }
        });
    };

    routes.find = function(req, res){
        res.render('query.jade');
    };

    return routes;
};
