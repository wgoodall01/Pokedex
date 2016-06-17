exports.fields = [
    ['Name', 'name'],
    ['Quantity', 'quantity'],
    ['Card Type', 'cardType'],
    ['Actual Type', 'actualType'],
    ['Level', 'level'],
    ['Design', 'design'],
    ['Series', 'series'],
    ['Expansion', 'expansion']
];

exports.validateCard = function(card){
    //Validate a new card
    if(typeof card.name == 'undefined' || card.name.length <= 0){ return false; }
    
    if(typeof card.quantity == 'undefined'){ card.quantity = 1 }
    else{
        card.quantity = parseInt(card.quantity, 10);
        if(card.quantity == NaN){ return false; }
        if(card.quantity <= 0){ return false; }
    }

    return card;
},

exports.normalizeSort = function(x){
    var y = {};
    for(var i = 0; i< x.length; ++i){
        y[x[i][1]] = (x[i][0] != "desc") ? 1 : -1;
    }
    return y;
},

exports.normalizeDbKeys = function(fromObj){
    // Everything in the form of a dict
    var toObj = {};

    for(var i = 0; i< exports.fields.length; ++i){
        if(typeof fromObj[exports.fields[i][1]] != 'undefined' && fromObj[exports.fields[i][1]].length){
            toObj[exports.fields[i][1]] = fromObj[exports.fields[i][1]];
        }
    }

    return toObj;
},

exports.keyToName = function(key){
    for(var i = 0; i < exports.fields.length; i++){
        if(exports.fields[i][1] == key){ return exports.fields[i][0]; }
    }
},

exports.nameToKey = function(name){
    for(var i = 0; i < exports.fields.length; i++){
        if(exports.fields[i][0] == key){ return exports.fields[i][1]; }
    }
}

