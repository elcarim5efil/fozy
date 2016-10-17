
'use strict';

const path = require('path');
const __root = fozy.__root;
const config = require(path.join(__root, 'fozy.config'));
let mock;

if(config.mock.proxy){
    // using proxy api
    console.log(`[KS] using proxy api: ${config.mock.proxy}`);
    const $proxy = require('koa2-http-proxy');
    mock = $proxy(config.mock.proxy);
} else {

    // using local api
    console.log('[KS] using local api');

    const fs = require('../../promise/fs');
    const qs = require('querystring');
    const requireNew = require('../../util/require_from_new.js');

    mock = async (ctx, next) => {
        // url whithout tail
        let url = ctx.url.split('?')[0];

        // data.json path
        let p = path.join(__root, config.mock.api, ctx.method.toLowerCase(), url, 'data.json');

        // data.js path, for processing data.json
        let pjs = path.join(__root, config.mock.api, ctx.method.toLowerCase(), url, 'data.js');

        // get process function
        let process = undefined;
        try{
            await fs.readFileAsync(pjs);
            process = requireNew(pjs);
        } catch(err) {

        }

        // response with mock data
        try {
            let data = await fs.readFileAsync(p);
            let json = JSON.parse(data),
                body = ctx.request.body,
                query = qs.parse(ctx.url.split('?')[1]);
            ctx.body = typeof process === 'function' ? process(json, body, query) : json;
            ctx.type = 'json';
        } catch(err) {
            return next();
        }
    };
}


module.exports = mock;