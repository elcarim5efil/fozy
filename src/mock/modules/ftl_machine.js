
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
    let tpl, pageFile;
    if(config.pages && config.pages.length > 0) {
        tpl = getPathByUrl(ctx.url);
        // console.log(tpl);
        pageFile = removePostfix(tpl);
        if(tpl === -1) {
            return next();
        }
    } else {
        tpl = ctx.url+'.ftl';
    }

    tpl = path.join(config.template.page || '', tpl);

    let data, gData, json, html;
    let p = path.join(__root, config.template.mock || '', (pageFile || ctx.url) + '.json');
    console.log(p);
    // page ftl mock data
    try {
        data = await fs.readFileAsync(p);
    } catch (err) {
        // console.log(`[KS] Cannot find mock data for: ${p}`);
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
        json = Object.assign(JSON.parse(gData), json);
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

/**
 * [removePostfix description]
 * @param  {[type]} path [description]
 * @return {[type]}      [description]
 */
function removePostfix(path) {
    if(typeof path !== 'string') {
        return;
    }
    var pp = path.split('/');
    pp = pp[pp.length-1];
    var p = pp.split('.');
    p.splice(p.length-1,1);
    return p.join('.');
}

/**
 * [getPathByUrl description]
 * @param  {[type]} url [description]
 * @return {[type]}     [description]
 */
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