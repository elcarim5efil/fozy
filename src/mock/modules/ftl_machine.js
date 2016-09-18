
'use strict';

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const __root = fozy.__root;
const path = require('path');
const config = require(path.join(__root, 'fozy.config'));
const Freemarker = require('freemarker.js');
const fm = Promise.promisifyAll(new Freemarker({
    viewRoot: path.join(__root, config.template.root || ''),
    options: {
    }
}));

const gp = path.join(__root, config.template.mock, 'global/data.json');
let ftlMachine = async (ctx, next) => {
    let p = path.join(__root, config.template.mock || '', ctx.url + '.json');
    let tpl = path.join(config.template.page || '', ctx.url+'.ftl');
    let data, gData, json, html;

    // page ftl mock data
    try {
        data = await fs.readFileAsync(p);
    } catch (err) {
        // console.log(`[KS] Cannot find mock data for: ${p}`);
        return next();
    }

    // global ftl mock data
    try{
        gData = await fs.readFileAsync(gp);
    } catch (err) {
        // console.log(`Cannot find global mock data for ${tpl}`);
    }

    // make json
    json = JSON.parse(data);
    if(gData) {
        json = Object.assign(json, JSON.parse(gData));
    }

    // render template
    try {
        html = await fm.renderAsync(tpl, json);
        ctx.body = html;
    } catch(err) {
        console.error('[KS] render error');
        return next();
    }
};

module.exports = ftlMachine;