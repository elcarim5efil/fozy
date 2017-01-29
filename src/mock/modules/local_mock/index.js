
'use strict';

import path from 'path';
import _  from '../../../util/extend';
const __root = fozy.__root;
const config = require(path.join(__root, 'fozy.config'));

// using local api

import fs from '../../../promise/fs';
import qs from 'querystring';
import JSONProcessor from '../../../util/json.processor.js';

let mock = async (ctx, next) => {
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
