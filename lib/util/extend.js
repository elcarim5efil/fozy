'use strict';

var fs = require('fs');
var _ = {
    /**
    * remove postfix from the path, '/mock/demo.ftl' => '/mock/demo'
    * @param  {string} path path string
    * @return {string}      path without postfix
    */
    removeQueryString: function removeQueryString(path) {
        if (typeof path !== 'string') {
            return;
        }
        return path.split('?')[0];
    },


    /**
    * remove postfix(.***) from the path, '/mock/demo.ftl' => '/mock/demo'
    * @param  {string} path path string
    * @return {string}      path without postfix
    */
    removePostfix: function removePostfix(path) {
        if (typeof path !== 'string') {
            return;
        }
        var parts = path.split('.');
        if (parts.length > 1) {
            parts.splice(parts.length - 1, 1);
        }
        return parts.join('.');
    },
    which: function which(arr, func) {
        var res = void 0;
        if (typeof func !== 'function') {
            return;
        }
        arr.some(function (item) {
            if (func.call(null, item)) {
                res = item;
                return true;
            }
        });
        return res;
    },
    isFileExist: function isFileExist(path) {
        try {
            return fs.existsSync(path);
        } catch (e) {
            return false;
        }
    }
};

module.exports = _;