
'use strict';

import path from 'path';
import  _ from '../../util/extend';
import requireWithNoCache from '../../util/require_from_new';
import fs from '../../promise/fs.js'
import json5 from 'json5';

export default class LocalData {
    constructor(option) {
        this.path = option.path;
        this.postfix = option.postfix || '.json'
        this.body = option.body || {};
        this.queryStr = option.queryStr || {};
    }

    async getData(option){
        let json = {};
        let jsonPath = this.path + this.postfix;
        let json5Path = this.path + '.json5';
        let isJsonFileExist = _.isFileExist(jsonPath);
        let isJson5FileExist = _.isFileExist(json5Path);
        
        let path = null;
        if( isJson5FileExist ) {
            path = json5Path;
        } else if( isJsonFileExist ) {
            path = jsonPath;
        }

        if( path ) {
            try {
                let file = await fs.readFileAsync(path, 'utf-8');
                return json = json5.parse(file);
            } catch (err) {
                console.info(`[KS] data parse error, check file: ${jsonPath}`);
            }
        }
        return json;
    }
}
