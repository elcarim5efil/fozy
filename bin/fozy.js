#!/usr/bin/env node
'use strict';

process.env.NODE_ENV = 'production';

const Cli = require('../lib/util/cli').default;
const log = require('../lib/util/log');
const Fozy = require('../index');
let cli = new Cli();
const config = {};

cli.on(['-v', '--version'], printVersion);
cli.on(['-h', '--help'], printHelp);
cli.on(['-w', '--watch'], initWatchMode);
cli.on(['-p', '--proxy'], initProxyMode);
cli.on(['--init'], initFozyConfigJSFile);
cli.on(['--nei'], runNeiSetup);
cli.onEnd(function() {
  new Fozy(config);
});
cli.parse(process.argv.slice(2));

function initWatchMode() {
  Object.assign(config, {
    watch: true
  });
}

function initProxyMode(proxyName){
  Object.assign(config, {
    proxyName: proxyName
  });
}

function initFozyConfigJSFile(){
  var init = require('../lib/init');
  init.run();
  return false;
}

function runNeiSetup(arg){
  let nei = require('../lib/nei');
  nei.build(arg);
  return false;
}

function printVersion(){
  const pack = require('../package.json');
  console.log(`v${pack.version}`);
  return false;
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
  return false;
}
