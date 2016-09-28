module.exports = function(json, body, query){
    json.msg = "I am new!!" + Math.random();
    json.body = body;
    json.query = query;
    return json;
};