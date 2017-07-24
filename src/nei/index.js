

require('babel-polyfill');

const loader = require('./loader.js');
const output = require('./output.js');
const config = require('./config.js');
const path = require('path');

const root = fozy.root;

module.exports = {
  build: async (key) => {
    // load nei configuration from server
    console.log('Loading NEI configuration...');
    const data = await loader(key);

    // output fozy.config.js
    console.log('NEI configuration loaded, building fozy.config.js...');
    await output.makeConfig(config.format(data));
    console.log(`fozy.config.js build success, path: ${path.join(root, './fozy.config.js')}`);
  },
};
