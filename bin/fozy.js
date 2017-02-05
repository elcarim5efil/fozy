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
  --init\t\tinitialize the project, so far, create fozy.config.js

Please visit Github repository https://github.com/elcarim5efil/fozy for more information.`);
});

cli.on(['-w', '--watch'], function(){
    global.fozy.__dev.watch = true;
    var app = require('../index');
    app.run({watch:true});
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
    var app = require('../index');
    app.run({});
};

cli.run(process.argv.slice(2));
