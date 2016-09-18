
'use strict';

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const __root = fozy.__root;
const path = require('path');
const config = require(path.join(__root, 'fozy.config'));
const Freemarker = require('freemarker.js');
const fm = Promise.promisifyAll(new Freemarker({
    viewRoot: path.join(__root, config.template.path),
    options: {
        // outputRoot: path.join(__root, config.template.path, 'TEMP'),
    }
}));
const fm2 = new Freemarker({
    viewRoot: path.join(__root, config.template.path),
    options: {
        // outputRoot: path.join(__root, config.template.path, 'TEMP'),
    }
})


const gp = path.join(__root, config.template.mock, 'global/data.json');
let ftlMachine = async (ctx, next) => {
    let p = path.join(__root, config.template.mock, ctx.url + '.json');
    try {
        // page ftl mock data
        let data = await fs.readFileAsync(p);
        // global ftl mock data
        let gData = await fs.readFileAsync(gp);
        // make json
        let json = JSON.parse(data);
        json = Object.assign(json, JSON.parse(gData));
        // render template
        let html = await fm.renderAsync('/pages' + ctx.url + '.ftl', json);
        ctx.body = html;
    } catch(err) {
        return next();
    }
};

module.exports = ftlMachine;