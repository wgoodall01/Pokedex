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
        //Modify an existing record in the database
        var id = req.params.id;
        
        var normalCard = dbUtils.normalizeDbKeys(req.body);
        var validated = dbUtils.validateCard(normalCard);
        
        if(validated){
            db.pokemon.update({_id:id}, validated, function(err, numReplaced){
                res.redirect("/view/" + id);
            })
        } else {
            req.flash("error", "Invalid card data - card not updated");
            res.redirect("/view/" + id);
        }
    };
    
    routes.add = function(req, res){
        if(req.method == "GET"){
            res.render("add.jade", {titleVerb:"Add", target:"/add", card:{}})
        } else if(req.method == "POST"){
            // Add the card to the database
            
            var normalCard = dbUtils.normalizeDbKeys(req.body);
            var validated = dbUtils.validateCard(normalCard);

            if(validated) {
                db.pokemon.insert(validated, function (err, newDoc) {
                    res.redirect("/view/" + newDoc._id);
                })
            } else {
                req.flash("error", "Invalid card data - card not added");
                res.redirect("/add/");
            }

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
