module.exports = function(fromObj){
    var toObj = {};
    
    var fields = [
        'name',
        'quantity',
        'cardType',
        'actualType',
        'level',
        'design',
        'series',
        'expansion'
    ];
    
    for(var i = 0; i< fields.length; ++i){
        if(typeof fromObj[fields[i]] != 'undefined' && fromObj[fields[i]].length){
            toObj[fields[i]] = fromObj[fields[i]];
        }
    }
    
    return toObj;
};
