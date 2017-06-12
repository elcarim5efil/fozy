
'use strict';

const __root = fozy.__root;
const config = fozy.__config;

import _path from 'path';
import  _ from '../../util/extend';

import JSONProcessor from '../../util/json.processor.js';
import qs from 'querystring';
import LocalData from './local_data';
import GlobalSyncData from './global_sync_data';

export default class MockData {
    constructor(option) {
        this.ctx = option.ctx || {};
        this.fileType = option.fileType || '.json';
        this.path = option.path || '';
        this.pageDataPath = _path.join(__root, config.template.mock || '' , (this.path || this.ctx.url) );
        this.data;
    }

    getData() {
        return this.data || this.updateData();
    }

    async updateData() {
        let data;
        try {
            let globalData = await new GlobalSyncData().getData();
            let pageData = await new LocalData({
                path: this.pageDataPath,
            }).getData();
            data = Object.assign({}, globalData, pageData);
        } catch (err) {
            console.info(`[KS] mock data parse error, check your template .json files, url: ${this.ctx.url}`);
        }

        return this.processData(data);
    }

    processData(data) {
        let ctx = this.ctx;
        let proc = new JSONProcessor({
            module: this.path + '.js',
            preStringify: true,
        });

        return proc.process(
            data,
            ctx.request.body,
            qs.parse(ctx.url.split('?')[1]),
            ctx,
        );


    }
}
