var express = require('express');
var normalizeDbKeys = require.main.require("./lib/normalizeDbKeys.js");

module.exports = function(db){
    var routes = {};
    
    routes.view = function(req, res){
        //Get the card from DB
        var id = req.params.id;

        db.pokemon.findOne({_id:id}, function(err, doc){
            if(err || doc == null){
                res.end("error. halp.");
                return;
            }

            res.render("view.jade", {
                target:"/update/" + doc._id,
                card:doc
            });
        });
    };
    
    routes.update = function(req, res){
        //Modify an existing record in the database
        var id = req.params.id;

        db.pokemon.update({_id:id}, normalizeDbKeys(req.body), function(err, numReplaced){
            res.redirect("/view/" + id);
        })
    };
    
    routes.add = function(req, res){
        if(req.method == "GET"){
            res.render("add.jade", {titleVerb:"Add", target:"/add", card:{}})
        } else if(req.method == "POST"){
            // Add the card to the database

            db.pokemon.insert(normalizeDbKeys(req.body), function(err, newDoc){
                res.redirect("/view/" + newDoc._id);
                console.dir(newDoc);
            })

        }
    };
    
    routes.remove = function(req, res){
        //Get the card from DB
        var id = req.params.id;

        db.pokemon.remove({_id:id}, function(err, doc){
            res.redirect('/');
        });
    }
    
    return routes;
};
