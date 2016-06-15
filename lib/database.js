var Datastore = require("nedb");

module.exports = function(app){
    return {
         pokemon: new Datastore({filename: app.get("db-cfg").location + "/pokemon.db",  autoload:true}),
        trainers: new Datastore({filename: app.get("db-cfg").location + "/trainers.db", autoload:true})
    }
};
