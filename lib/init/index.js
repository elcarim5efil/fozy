
'use strict';

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
        fs.exists(confTar, function (data, err) {
            if (!!!err && !data) {
                copyFile(confSrc, confTar);
                console.log('[fozy] fozy.config.js created');
            } else {
                console.log('[fozy] fozy.config.js already exists');
            }
        });
    }
};

function copyFile(src, tar) {
    fs.createReadStream(src).pipe(fs.createWriteStream(tar));
}
module.exports = init;