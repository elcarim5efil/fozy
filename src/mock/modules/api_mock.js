
'use strict';

const Promise = require('bluebird');
const qs = require('querystring');
const fs = Promise.promisifyAll(require('fs'));
const path = require('path');
const requireNew = require('../requireNew.js');
const __root = fozy.__root;
const config = require(path.join(__root, 'fozy.config'));

let mock = async (ctx, next) => {
    let url = ctx.url.split('?')[0];
    let p = path.join(__root, config.mock.api, ctx.method.toLowerCase(), url, 'data.json');
    let pjs = path.join(__root, config.mock.api, ctx.method.toLowerCase(), url, 'data.js');
    let process = undefined;

    let body = ctx.request.body,
        query = qs.parse(ctx.url.split('?')[1]);

    try{
        await fs.readFileAsync(pjs);
        process = requireNew(pjs);
    } catch(err) {

    }

    try {
        let data = await fs.readFileAsync(p);
        let json = JSON.parse(data);
        ctx.body = typeof process === 'function' ? process(json, body, query) : json;
        ctx.type = 'json';
    } catch(err) {
        return next();
    }
};

module.exports = mock;