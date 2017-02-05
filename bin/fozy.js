#!/usr/bin/env node

'use strict';

const path = require('path');
if(!!!global.fozy) {
    let root = path.join(process.cwd());
    global.fozy = {
        __root: root,
        __dev: {},
    }
    try{
        global.fozy.__config = require(path.join(root, 'fozy.config'));
    } catch(e) {}
}

const pack = require('../package.json');
const Cli = require('../lib/cli');

let cli = new Cli();

cli.on(['-v', '--version'], () => {
    console.log(`v${pack.version}`);
});

cli.on(['-h', '--help'], () => {
    console.log(
`Usage: fozy [options]

Options:
  -v, --version\t\tprint version
  -h, --help\t\tprint help
  -w, --watch\t\tstart live-reload with browser-sync
  -p, --proxy [proxyName], using proxy api, {proxyName} should be contained in de proxyMap
  --init\t\tinitialize the project, so far, create fozy.config.js

Please visit Github repository https://github.com/elcarim5efil/fozy for more information.`);
});

let runServer;

cli.on(['-w', '--watch'], function(){
    global.fozy.__dev.watch = true;
    runServer = true;
});

cli.on(['-p', '--proxy'], (arg) => {
    console.log(`using proxy config: ${arg}`);
    let proxy = global.fozy.__config.mock.proxyMap[arg];
    if(proxy){
        console.log('proxy: ', arg);
        global.fozy.__config.mock.proxy = proxy;
    }
    runServer = true;
});

cli.on(['--init'], function(){
    var init = require('../lib/init');
    init.run();
});

cli.on(['--nei'], function(arg){
    let nei = require('../lib/nei');
    nei.build(arg);
});

cli.normal = function(){
    runServer = true;
};

cli.end = function(){
    if(runServer) {
        var app = require('../index');
        app.run({});
    }
};

cli.parse(process.argv.slice(2));
