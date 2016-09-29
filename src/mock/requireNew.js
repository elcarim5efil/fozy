'use strict';

const path = require('path');
module.exports = function requireWithNoCache(file){
    delete require.cache[path.resolve(file)];
    return require(file);
}