module.exports = function(json, body, query){
    console.log(query);
    json.name = query.name || json.name;
    return json;
};
