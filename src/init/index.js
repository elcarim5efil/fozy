
'use strict';

const Promise = require('bluebird');
// const fs = Promise.promisifyAll(require('fs'));
const fs = require('fs');
const path = require('path');
const __root = fozy.__root;

let init = {
    run() {
        this.makeConf();
    },
    makeConf() {
        let confSrc = path.join(__dirname, '../../sample/fozy.config.js');
        let confTar = path.join(__root, 'fozy.config.js');
        copyFile(confSrc, confTar);
    }
}

function copyFile(src, tar) {
    fs.createReadStream(src).pipe(fs.createWriteStream(tar));
}
module.exports = init;