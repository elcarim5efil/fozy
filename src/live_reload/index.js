import path from 'path';
const __root = fozy.__root;
const config = fozy.__config;

var files2Watch = [];
files2Watch.push(path.join(__root, config.template.root || ''));
files2Watch  = files2Watch.concat(config.watch.map(function(item){
    return path.join(__root, item);
}));

module.exports = require('koa-browser-sync')({
    init: true,
    files: files2Watch,
    notify: false,
    ui: false,
    online: false,
    open: config.autoOpen,
});


