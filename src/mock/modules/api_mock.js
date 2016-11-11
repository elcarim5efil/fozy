
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
        let url = removePostfix(ctx.url.split('?')[0]);

        let method = ctx.method.toLocaleLowerCase();

        let r = path.join(__root, config.mock.api.root, method && config.mock.api[method]);
        let fileName = config.mock.fileName;

        let p, pjs;
        if(!fileName) {
            // data.json path
            p = path.join(r, url + '.json');
            // data.js path, for processing data.json
            pjs = path.join(r, url + '.js');
        } else {
            // data.json path
            p = path.join(r, url, fileName + '.json');
            // data.js path, for processing data.json
            pjs = path.join(r, url, fileName + '.js');
        }

        // console.log(p, pjs);

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

/**
 * remove postfix from the path, '/mock/demo.ftl' => '/mock/demo'
 * @param  {string} path path string
 * @return {string}      path without postfix
 */
function removePostfix(path) {
    if(typeof path !== 'string') {
        return;
    }
    var p = path.split('.');
    if(p.length > 1) {
        p.splice(p.length-1,1);
    }
    return p.join('.');
}

module.exports = mock;