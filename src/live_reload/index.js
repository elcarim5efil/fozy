
'use strict';

import path from 'path';
import koaBrowserSync from './browser.sync.js';

const __root = fozy.__root;
const config = fozy.__config;

var files2Watch = [];
files2Watch.push(path.join(__root, config.template.root || ''));
files2Watch  = files2Watch.concat(config.watch.map(function(item){
    return path.join(__root, item);
}));

var browserSyncOption = {
    init: true,
    watchOptions: {
        ignored: config.ignoredWatch || ''
    },
    files: files2Watch,
    notify: config.notify || false,
    ui: false,
    online: false,
    logLevel: 'slient',
    open: true || config.autoOpen
};

module.exports = koaBrowserSync(browserSyncOption);
