module.exports = function(json, body, query, ctx){
    json.name = query.name || json.name;
    return json;
};
