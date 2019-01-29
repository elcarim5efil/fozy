const path = require('path');
const koaBrowserSync = require('./browser.sync');

const root = fozy.root;
const config = fozy.config;

let files2Watch = [];
files2Watch.push(path.join(root, config.template.root || ''));
files2Watch = files2Watch.concat(config.watch.map(item => path.join(root, item)));

const browserSyncOption = {
  init: true,
  watchOptions: {
    ignored: config.ignoredWatch || '',
  },
  files: files2Watch,
  notify: config.notify || false,
  ui: false,
  online: false,
  logLevel: 'slient',
  open: true || config.autoOpen,
};

module.exports = koaBrowserSync(browserSyncOption);
