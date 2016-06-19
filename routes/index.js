//App routing logic
var express = require('express');

module.exports = function(db){
    var r = express.Router();
    
    var card = require('./card')(db);
    var query = require('./query')(db);
    
    //     ----------   Card Operations   ----------
    
    //GET -> View one card
    //  Contains a form which posts to /update
    r.get("/view/:id", card.view);
    
    //POST -> Change info for one card
    //  Redirects back to /view
    //  If there's no ID, create a new card
    r.post("/update/:id", card.update);
    r.post("/update/", card.update);
       
    //POST -> Add a card
    //  Redirects to /view for that card
    r.all("/add", card.add);
    
    //POST /remove w/ ID arg removes card.
    r.post("/remove/:id", card.remove);
    
    
    //     ----------   Query Operations   ----------
    
    //GET /find
    //  returns a page w/ search fields
    r.all("/find", query.find);
    
    //GET /list w/ url args as query
    //  returns a page listing the query, may just redirect if
    //  there's only one result.
    r.get("/list", query.list);
    r.get("/", query.list);
    
    return r;
};
