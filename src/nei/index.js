
'use strict';

require('babel-polyfill');

const handlebars = require('handlebars');
const loader = require('./loader.js');
const fs = require('../../lib/promise/fs.js')
const path = require('path');
const __root = fozy.__root;

module.exports = {
    build: async (key) => {

        // load nei configuration from server
        console.log('Loading NEI configuration...');
        let data = await loader(key);

        console.log('NEI configuration loaded, building fozy.config.js...');
        // constuct pages setting
        let pages = data.pages.map((item, i) => {
            return {
                name: item.name,
                url: item.path,
                path: item.templates[0].path,
            }
        });

        // read config template file
        let confTpl = path.join(__dirname, '../../templates/config.hbs');
        let file;
        try{
            file = await fs.readFileAsync(confTpl, 'utf-8');
        } catch(err) {
            console.log('constuct error', err);
            return;
        }

        // render config template
        let template = handlebars.compile(file);
        let output= template({
            pages: pages,
        });

        // output fozy.config.js on current directory
        try{
            await fs.writeFileAsync('./fozy.config.js', output);
        } catch(err) {
            console.log(err);
        }
        console.log('fozy.config.js build success, path: ' +  path.join(__root, './fozy.config.js'));
    }
}
