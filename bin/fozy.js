#!/usr/bin/env node
'use strict';
const path = require('path');
const Cli = require('../lib/cli');
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
            __root: root,
            __dev: {},
        }
    }
}

function runInWatchMode(){
    readyToRunServer();
    global.fozy.__dev.watch = true;
}

function runInProxyMode(arg){
    readyToRunServer();
    if(isReady2RunServer) {
        console.log(`using proxy config: ${arg}`);
        let proxy = global.fozy.__config.mock.proxyMap[arg];
        if(proxy){
            console.log('proxy: ', arg);
            global.fozy.__config.mock.proxy = proxy;
        }
    }
}

function initFozyConfigJSFile(){
    var init = require('../lib/init');
    isReady2RunServer = false;
    init.run();
}

function runNeiSetup(arg){
    let nei = require('../lib/nei');
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
    if(!!!global.fozy.__config){
        try{
            global.fozy.__config = require(path.join(global.fozy.__root, 'fozy.config'));
            isReady2RunServer = true;
        } catch(e) {
            console.log('cannot find fozy.config.js, please make sure you make this file.');
            return false;
        }
    }
    return true;
}

cli.parse(process.argv.slice(2));
