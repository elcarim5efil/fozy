
'use strict';

import path from 'path';
import koaBrowserSync from 'koa-browser-sync';

const __root = fozy.__root;
const config = fozy.__config;

var files2Watch = [];
files2Watch.push(path.join(__root, config.template.root || ''));
files2Watch  = files2Watch.concat(config.watch.map(function(item){
    return path.join(__root, item);
}));


module.exports = koaBrowserSync({
    init: true,
    files: files2Watch,
    notify: false,
    ui: false,
    online: false,
    open: config.autoOpen,
});
