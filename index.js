
'use strict';

require('babel-core/register');
require('babel-polyfill');

const app = require('./app');
const path = require('path');
const browserSync = require('browser-sync').create();
const config = require(path.join(fozy.__root, 'config')),
    __root = fozy.__root;

var listener,
    MAX_RETRY = config.max_retry || 10,
    port = config.port || 3000;

process.on('uncaughtException', function(err){
    if(err.code === 'EADDRINUSE'){
        if(--MAX_RETRY>0) {
            console.log('port %d is in used, trying port %d', port, ++port);
            doListen();
        } else {
            console.log('retry to much time(%d)', MAX_RETRY);
        }
    } else {
        console.log('undandle error', err);
    }

});

var files = [];
files.push(path.join(__root, config.template.path));
files = files.concat(config.resource.map(function(item){
    return path.join(__root, item);
}));

function doListen(){
    listener = app.listen(port, function(){
        console.log('Server is listening to port %d', listener.address().port);
        browserSync.init({
            proxy: 'http://localhost:' + config.port,
            port: config.port + 1,
            files: files,
            notify: false,
        })
    });
};

doListen();
