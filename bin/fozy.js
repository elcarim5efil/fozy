#!/usr/bin/env node

const path = require('path');
if(!!!global.fozy) {
    global.fozy = {
        __root: path.join(process.cwd()),
    }
}

const pack = require('../package.json');
const Cli = require('../lib/cli');

let cli = new Cli();

cli.on(['-v', '--version'], function(){
    console.log(`v${pack.version}`);
});

cli.on(['-h', '--help'], function(){
    console.log(`
        -v, --version, print version;
        -h, --help, print help;
        -w, --watch, start live-reload with browser-sync;`);
});

cli.on(['-w', '--watch'], function(){
    var app = require('../index');
    app.run({watch:true});
});

cli.normal = function(){
    var app = require('../index');
    app.run({});
};

cli.run(process.argv.slice(2));
