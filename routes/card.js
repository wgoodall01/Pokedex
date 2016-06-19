var express = require('express');
var dbUtils = require.main.require("./lib/dbUtils");

module.exports = function(db){
    var routes = {};
    
    routes.view = function(req, res){
        //Get the card from DB
        var id = req.params.id;

        db.pokemon.findOne({_id:id}, function(err, doc){
            if(err || doc == null){
                req.flash("error", "Card does not exist.");
                res.redirect("/");
                return;
            }

            res.render("view.jade", {
                target:"/update/" + doc._id,
                card:doc
            });
        });
    };
    
    routes.update = function(req, res){
        //Modify an existing record in the database, or create one
        var normalCard = dbUtils.normalizeDbKeys(req.body);
        var validated = dbUtils.validateCard(normalCard);
        var id = req.params.id;

        function updateCallback(err, dbRes) {
            if(err){
                req.flash("error", "Database error");
                res.cancel()
            } else{
                res.redirect("/view/" + (dbRes._id || id));
            }
        }

        if(validated) {
            if (id) {
                //Request to modify a card
                db.pokemon.update({_id:id}, validated, updateCallback)
            } else {
                //Request to create a card
                db.pokemon.insert(validated, updateCallback)
            }
        } else {
            req.flash("error", "Invalid card data - no changes made");
            res.cancel();
        }

    };
    
    routes.add = function(req, res){
        if(req.method == "GET"){
            res.render("add.jade", {titleVerb:"Add", target:"/add", card:{}})
        } else if(req.method == "POST"){
            //Nothing
            req.flash("error", "I removed this, it no longer works")
        }
    };
    
    routes.remove = function(req, res){
        //Get the card from DB
        var id = req.params.id;

        db.pokemon.remove({_id:id}, function(err, doc){
            res.redirect('/');
        });
    };
    
    return routes;
};
