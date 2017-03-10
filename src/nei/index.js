
'use strict';

require('babel-polyfill');

import handlebars from 'handlebars';
import path from 'path';
import req from '../promise/req';
import fs from '../promise/fs';
import mkdir from '../promise/mkdir';
import * as ut from './util';
import * as _ from '../util/extend';

const __root = fozy.__root;

class Nei {
    constructor(key) {
        this.neiHost = 'https://nei.netease.com';
        this.specType = 0;
        this.key = key || '';
        this.url = `${this.neiHost}/api/projectres/?key=${encodeURIComponent(this.key)}&spectype=${this.specType}`;
        this.neiConfig = {};
        this.fozyConfig = {};
        this.asyncDataList = {};
        console.log(this.url);
    }

    async build() {
        await this.loadConfig();
        console.log('NEI configuration loaded, building fozy.config.js...');

        this.getFozyConfig();
        // await this.buildFozyConfigFile( this.fozyConfig );
        // console.log('fozy.config.js build success, path: ' +  path.join(__root, './fozy.config.js'));

        this.getAsyncDataList();
        console.log(this.asyncDataList);
        await this.buildAsyncDataFiles( this.asyncDataList );
    }

    async loadConfig(cb) {
        try{
            console.log('Loading NEI configuration...');
            let json = await req({
                url: this.url,
            });
            this.processJson(json);
        } catch(err) {
            console.log('NEI configuration download error: ', err);
        }
    }

    processJson(json) {
        let data = {};
        data = JSON.parse(json.toJSON().body);
        if(data.code !== 200) {
            throw data
        } else {
            this.neiConfig = data.result;
        }
    }

    getFozyConfig() {
        return this.fozyConfig = ut.getFozyConfig(this.neiConfig);
    }

    getAsyncDataList() {
        return this.asyncDataList = ut.getAsyncDataList(this.neiConfig);
    }

    async buildFozyConfigFile(config) {
        let confTpl = path.join(__dirname, '../../templates/config.hbs');
        let file;
        try{
            file = await fs.readFileAsync(confTpl, 'utf-8');
        } catch(err) {
            console.log('constuct error', err);
            return;
        }

        let template = handlebars.compile(file);
        let output= template(config);

        try{
            await fs.writeFileAsync('./fozy.config.js', output);
        } catch(err) {
            console.log(err);
        }
    }

    async buildAsyncDataFiles(asyncDataList) {
        let asyncMockRoot = this.fozyConfig.asyncMockRoot;
        asyncDataList.forEach(async (asyncData, index) => {
            let asyncDataPath = path.join(asyncMockRoot, asyncData.method, asyncData.path);
            await this.createAsyncDataFile(asyncDataPath, 'data')
        });
    }

    async createAsyncDataFile(filePath, fileName) {
        if( !fileName ) {
            let parts = filePath.split(path.sep);
            fileName = parts.unshift();
            filePath = parts.join(path.sep);
        }

        try {
            await mkdir(filePath, fileName);
        } catch(e) {
        }

        try {
            await fs.writeFileAsync( path.join(filePath, fileName + '.json'), '{}' );
            // await fs.writeFileAsync( path.join(filePath, fileName + '.js'), 'module.exports = function(json, body, queryStr){return json;}' );
        } catch (e) {

        }
    }
}

module.exports = Nei;

