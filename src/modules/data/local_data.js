
'use strict';

import path from 'path';
import  _ from '../../util/extend';
import requireWithNoCache from '../../util/require_from_new';

export default class LocalData {
    constructor(option) {
        this.path = option.path;
        this.postfix = option.postfix || '.json'
        this.body = option.body || {};
        this.queryStr = option.queryStr || {};
    }

    getData(option){
        let json = {};
        let filePath = this.path + this.postfix;
        let isDataFileExist = _.isFileExist(filePath);

        if( isDataFileExist ) {
            try {
                json = requireWithNoCache(filePath);
            } catch (err) {
                console.info(`[KS] data parse error, check file: ${filePath}`);
            }
        }

        return json;
    }
}
