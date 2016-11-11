module.exports = function(json, body, query, ctx){
    console.log(query);
    console.log(body);
    console.log(json);
    console.log(ctx);
    json.name = query.name || json.name;
    return json;
};
