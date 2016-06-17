var express = require('express');
var dbUtils = require.main.require("./lib/dbUtils");
var normalizeDbKeys = dbUtils.normalizeDbKeys;
var validateCard = dbUtils.validateCard;

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

        var sortQualifiers = [];
        if(req.query.sortsJson){
            sortQualifiers = JSON.parse(req.query.sortsJson);
        }else{
            sortQualifiers = [['asc', 'name']];
        }
        
        var normalSort = dbUtils.normalizeSort(sortQualifiers);

        db.pokemon
            .find(regexFields)
            .sort(normalSort)
            .exec(function(err, docs){
                //If the card is the only one, redirect to its listing
                if(docs.length == 1){
                    req.flash("meh", "1 result displayed");
                    res.redirect("/view/"+docs[0]._id);
                }else {
                    
                    var message = `${docs.length} results shown, sorting by `;
                    
                    for(q in normalSort){
                        if(normalSort.hasOwnProperty(q)){
                            message += dbUtils.keyToName(q) + " > "
                        }
                    }
                    
                    message = message.substring(0, message.length-3);
                    message += '.';
                    
                    res.render('list.jade', {cards: docs, nameSearch:queryFields.name, listMessage: message})
                }
            });
    };

    routes.find = function(req, res){
        res.render('query.jade');
    };

    return routes;
};
