
'use strict';

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const path = require('path');
const __root = fozy.__root;
const config = require(path.join(__root, 'fozy.config'));

let mock = async (ctx, next) => {
    let url = ctx.url.split('?')[0];
    let p = path.join(__root, config.mock.api, ctx.method.toLowerCase(), url, 'data.json')
    
    // api mock data
    try {
        let data = await fs.readFileAsync(p);
        let json = JSON.parse(data);
        ctx.body = json;
        ctx.type = 'json';
    } catch(err) {
        return next();
    }
};

module.exports = mock;