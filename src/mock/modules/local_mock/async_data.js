
'use strict';

import path from 'path';
import _  from '../../../util/extend';
const __root = fozy.__root;
const config = require(path.join(__root, 'fozy.config'));

import qs from 'querystring';
import JSONProcessor from '../../../util/json.processor.js';
import LocalData from '../local_data';

export default class AsyncData {
    constructor(ctx) {
        this.files = {};
        this.ctx = ctx;
        this.data = {};
    }

    getData() {
        let files = this.files = this.getFiles(this.ctx);

        let data = this.data = new LocalData({
            path: files.json,
        }).getData();

        return this.processData(data);
    }

    processData(data) {
        let ctx = this.ctx;
        let proc = new JSONProcessor({
            module: this.files.js + '.js',
            preStringify: false,
        });

        return proc.process(
            data || {},
            ctx.request.body,
            qs.parse(ctx.url.split('?')[1]),
            ctx
        );
    }

    getFiles(ctx){
        let files = {};
        let url = _.removePostfix(ctx.url.split('?')[0]);
        let method = ctx.method.toLocaleLowerCase();
        let root = path.join(__root, config.mock.api.root, method && config.mock.api[method]);
        let fileName = config.mock.fileName;
        if(!fileName) {
            files.json = path.join(root, url);
            files.js = path.join(root, url);
        } else {
            files.json = path.join(root, url, fileName);
            files.js = path.join(root, url, fileName);
        }
        return files;
    }
}

