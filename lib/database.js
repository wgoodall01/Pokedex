var Datastore = require("nedb");

module.exports = function(app){
    return {
         pokemon: new Datastore({filename: app.get("db").location + "/pokemon.db",  autoload:true}),
        trainers: new Datastore({filename: app.get("db").location +  + "/trainers.db", autoload:true})
    }
};
