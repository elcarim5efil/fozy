
'use strict';

import path from 'path';
import _  from '../../util/extend';
const __root = fozy.__root;
const config = fozy.__config;

import qs from 'querystring';
import JSONProcessor from '../../util/json.processor.js';
import LocalData from './local_data';

export default class AsyncData {
    constructor(ctx) {
        this.ctx = ctx;
        this.filePath = this.getFilePath(ctx) || '';
        this.data = {};
    }

    getData() {
        this.data = new LocalData({
            path: this.filePath,
        }).getData();

        return this.processData(this.data, this.ctx);
    }

    processData(data, ctx) {
        let proc = new JSONProcessor({
            module: this.filePath + '.js',
            preStringify: false,
        });

        return proc.process(
            data || {},
            ctx.request.body,
            qs.parse(ctx.url.split('?')[1]),
            ctx
        );
    }

    getFilePath(ctx){
        let url = _.removePostfix(ctx.url.split('?')[0]);
        let method = ctx.method.toLocaleLowerCase();
        let root = path.join(__root, config.mock.api.root, method && config.mock.api[method]);
        let fileName = config.mock.fileName || '';
        return path.join(root, url, fileName);
    }
}

