
'use strict';

const requireNew = require('../../util/require_from_new.js');
const fs = require('../../promise/fs');

class JSONProcessor {
    constructor(option) {
        this.module = option.module;
        this.preStringify = option.preStringify || false;
        try{
            this.processor = fs.existsSync(option.module) ? requireNew(option.module) : undefined;
        } catch(err) {
            this.processor = undefined;
        }
    }

    process(json) {
        let proc = this.processor;
        let args = [].slice.call(arguments, 0);
        let res = Object.assign({}, json);

        if(typeof proc === 'function') {
            res = proc.apply(null, args);
        }
        res = this.__stringify(res);
        return res;
    }

    // stringify property in json according to json.__json
    __stringify(json) {
        let res = Object.assign({}, json);
        if(!this.preStringify
            || !json || !json.__json || json.__json.length === 0) {
            return res;
        }

        json.__json.forEach(function(item, i){
            let key = Object.keys(item)[0];
            if(typeof json[key] === 'object') {
                res[item[key]] = JSON.stringify(json[key]);
            }
        })

        return res;
    }

}

module.exports = JSONProcessor;