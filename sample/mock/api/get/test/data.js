module.exports = function(json, params){
    var num = Math.random();
    console.log(num);
    json.msg = "I am new!!" + num;
    return json;
};
