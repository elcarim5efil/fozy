require('babel-polyfill');

const path = require('path');
const loader = require('./loader');
const output = require('./output');
const config = require('./config');
const { log } = require('../util');

const root = fozy.root;

module.exports = {
  build: async (key) => {
    // load nei configuration from server
    log.info('Loading NEI configuration...');
    const data = await loader(key);

    // output fozy.config.js
    log.info('NEI configuration loaded, building fozy.config.js...');
    await output.makeConfig(config.format(data));
    log.info(`fozy.config.js build success, path: ${path.join(root, './fozy.config.js')}`);
  },
};
