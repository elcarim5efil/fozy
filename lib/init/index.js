
'use strict';

var Promise = require('bluebird');
// const fs = Promise.promisifyAll(require('fs'));
var fs = require('fs');
var path = require('path');
var __root = fozy.__root;

var init = {
    run: function run() {
        this.makeConf();
    },
    makeConf: function makeConf() {
        var confSrc = path.join(__dirname, '../../sample/fozy.config.js');
        var confTar = path.join(__root, 'fozy.config.js');
        copyFile(confSrc, confTar);
    }
};

function copyFile(src, tar) {
    fs.createReadStream(src).pipe(fs.createWriteStream(tar));
}
module.exports = init;