
'use strict';

require('babel-polyfill');

const loader = require('./loader.js');
const output = require('./output.js');
const config = require('./config.js');
const path = require('path');
const __root = fozy.__root;

module.exports = {
    build: async (key) => {

        // load nei configuration from server
        console.log('Loading NEI configuration...');
        let data = await loader(key);

        console.log('NEI configuration loaded, building fozy.config.js...');

        // output fozy.config.js
        await output.makeConfig(config.format(data));
        console.log('fozy.config.js build success, path: ' +  path.join(__root, './fozy.config.js'));
    }
}
