#!/usr/bin/env node
'use strict';

process.env.NODE_ENV = 'production';

const path = require('path');
const Cli = require('../src/cli');
const log = require('../src/util').log;
const fs = require('fs');
let cli = new Cli();
let isReady2RunServer;

setFozyObj();

cli.on(['-v', '--version'], printVersion);
cli.on(['-h', '--help'], printHelp);
cli.on(['-w', '--watch'], runInWatchMode);
cli.on(['-p', '--proxy'], runInProxyMode);
cli.on(['--init'], initFozyConfigJSFile);
cli.on(['--nei'], runNeiSetup);

cli.normal = function(){
    readyToRunServer();
    doRunServer();
};

cli.end = function runServer(){
    doRunServer();
};

function doRunServer(){
    if(isReady2RunServer) {
        var app = require('../index');
        app.run({});
    }
}

function setFozyObj(){
    if(!!!global.fozy) {
        let root = path.join(process.cwd());
        global.fozy = {
            root: root,
            dev: {},
        }
    }
}

function runInWatchMode(){
    readyToRunServer();
    global.fozy.dev.watch = true;
}

function runInProxyMode(arg){
    readyToRunServer();
    if(isReady2RunServer) {
        log.info(`using proxy config: ${arg}`);
        let proxy = global.fozy.config.mock.proxyMap[arg];
        if(proxy){
            log.info('proxy: ', arg);
            global.fozy.config.mock.proxy = proxy;
        }
    }
}

function initFozyConfigJSFile(){
    var init = require('../src/init');
    isReady2RunServer = false;
    init.run();
}

function runNeiSetup(arg){
    let nei = require('../src/nei');
    isReady2RunServer = false;
    nei.build(arg);
}

function printVersion(){
    const pack = require('../package.json');
    console.log(`v${pack.version}`);
}

function printHelp(){
console.log(
`Usage: fozy [options]

Options:
  -v, --version\t\t\tprint version
  -h, --help\t\t\tprint help
  -w, --watch\t\t\tstart live-reload with browser-sync
  -p, --proxy {proxyName}, \tusing proxy api, {proxyName} should be contained in de proxyMap
  --init\t\t\tinitialize the project, so far, create fozy.config.js

Please visit Github repository https://github.com/elcarim5efil/fozy for more information.`);
}

function readyToRunServer(){
    if(global.fozy.config) {
        return true;
    }

    let fozyConfigPath = path.join(global.fozy.root, 'fozy.config.js');

    if( !isFileExist(fozyConfigPath) ) {
        log.error('Cannot find fozy.config.js, please make sure the file exists.');
        return false;
    }

    try{
        global.fozy.config = require(fozyConfigPath);
        isReady2RunServer = true;
    } catch(e) {
        log.error('Fail reading fozy.config.js, please check your file.', e);
        return false;
    }
    return true;
}

function isFileExist(path) {
    try {
        return fs.existsSync(path);
    } catch (e) {
        return false;
    }
}

cli.parse(process.argv.slice(2));
