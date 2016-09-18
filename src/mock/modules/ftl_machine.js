
'use strict';

const Promise = require('bluebird');
const __root = fozy.__root;
const path = require('path');
const Freemarker = require('freemarker.js');

const config = require(path.join(__root, 'fozy.config'));
const fs = Promise.promisifyAll(require('fs'));
const fm = Promise.promisifyAll(new Freemarker({
    viewRoot: path.join(__root, config.template.root || ''),
    options: {
    }
}));

const gp = path.join(__root, config.template.mock, 'global/data.json');

let ftlMachine = async (ctx, next) => {
    let p = path.join(__root, config.template.mock || '', ctx.url + '.json');

    let tpl;
    if(config.pages && config.pages.length > 0) {
        tpl = getPathByUrl(ctx.url);
        if(tpl === -1) {
            return next();
        }
    } else {
        tpl = ctx.url+'.ftl';
    }
    
    tpl = path.join(config.template.page || '', tpl);

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

function getPathByUrl(url) {
    var p = config.pages;
    for(let i=0, len=p.length; i<len; ++i) {
        if(p[i].url === url) {
            return p[i].path;
        }
    }
    return -1;
}

module.exports = ftlMachine;