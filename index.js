
'use strict';

require('babel-polyfill')

const app = require('./lib/app');
const path = require('path');
const config = require(path.join(fozy.__root, 'fozy.config')),
    __root = fozy.__root;

var listener,
    MAX_RETRY = config.maxRetry || 10,
    port = config.port || 3000,
    watch = false;

process.on('uncaughtException', function(err){
    if(err.code === 'EADDRINUSE'){
        if(--MAX_RETRY>0) {
            console.log('[KS] Port %d is in used, trying port %d', port, ++port);
            doListen();
        } else {
            console.log('[KS] Retry to much time(%d)', MAX_RETRY);
        }
    } else {
        console.log('[KS] Undandle error', err);
    }

});

var files2Watch = [];
files2Watch .push(path.join(__root, config.template.root || ''));
files2Watch  = files2Watch .concat(config.watch.map(function(item){
    return path.join(__root, item);
}));

function doListen(){
    listener = app.listen(port, function(){
        console.log('[KS] Koa server is listening to port %d', listener.address().port);
        if(watch) {
            let browserSync = require('browser-sync').create();
            browserSync.init({
                proxy: 'http://localhost:' + config.port,
                port: config.port + 1,
                files: files2Watch,
                notify: false,
            });
        }
    });
};

var entry = {
    run: function(options){
        watch = options.watch;
        doListen();
    }
}

module.exports = entry;
