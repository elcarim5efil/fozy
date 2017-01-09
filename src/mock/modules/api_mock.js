
'use strict';

const path = require('path');
const _ = require('../../util/extend');
const __root = fozy.__root;
const config = require(path.join(__root, 'fozy.config'));
let mock;

if(config.mock.proxy){
    // using proxy api
    console.log(`[KS] using proxy api: ${config.mock.proxy}`);
    const $proxy = require('koa2-http-proxy');
    mock = $proxy({
        target: config.mock.proxy,
        changeOrigin: true,
        autoRewrite: true,
    });
} else {

    // using local api
    console.log('[KS] using local api');

    const fs = require('../../promise/fs');
    const qs = require('querystring');
    const JSONProcessor = require('./json.processor.js');
    const requireNew = require('../../util/require_from_new.js');

    mock = async (ctx, next) => {
        let files = {};
        let isJsFileExists, isJsonFileExists;
        try {
            let data, json;
            files = getFiles(ctx);
            isJsFileExists = fs.existsSync(files.js);
            isJsonFileExists = fs.existsSync(files.json);
            // response with mock data

            if(!isJsFileExists && !isJsonFileExists ){
                return next();
            }

            if(isJsonFileExists) {
                data = await fs.readFileAsync(files.json);
            }

            json = JSON.parse(data || '{}');

            let proc = new JSONProcessor({
                module: files.js,
                preStringify: false,
            });
            json = proc.process(
                json || {},
                ctx.request.body,
                qs.parse(ctx.url.split('?')[1]),
                ctx
            );

            ctx.body = json;
            ctx.type = 'json';
        } catch(err) {
            if(isJsFileExists || isJsonFileExists){
                console.error(`[KS] mock data error, there may be something wrong with your .json files, url: ${ctx.url}`);
            } else{
                return next();
            }
        }
    };
}

function getFiles(ctx){
    let files = {};
    let url = _.removePostfix(ctx.url.split('?')[0]);
    let method = ctx.method.toLocaleLowerCase();
    let r = path.join(__root, config.mock.api.root, method && config.mock.api[method]);
    let fileName = config.mock.fileName;
    if(!fileName) {
        // data.json path
        files.json = path.join(r, url + '.json');
        // data.js path, for processing data.json
        files.js = path.join(r, url + '.js');
    } else {
        // data.json path
        files.json = path.join(r, url, fileName + '.json');
        // data.js path, for processing data.json
        files.js = path.join(r, url, fileName + '.js');
    }
    return files;
}

module.exports = mock;