
'use strict';

const path = require('path');
const fs = require('../../promise/fs');

const __root = fozy.__root;
const config = require(path.join(__root, 'fozy.config'));


const gp = path.join(__root, config.template.mock, 'global/data.json');

let engine;

let tplEngine = (option) => {
    let fileType = '';
    if(option.engine == 'ftl') {
        engine = require('../../engine/freemarker')({
            viewRoot: path.join(__root, config.template.root || ''),
            options: {
                // sourceEncoding: 'UTF-8',
            }
        });
        fileType = '.ftl'
    }
    return async (ctx, next) => {
        let tpl, pageFile;

        // get the template mock data file path according to the config.pages
        if(config.pages && config.pages.length > 0) {
            tpl = getPathByUrl(ctx.url);
            pageFile = removePostfix(tpl);
            if(tpl === -1) {
                return next();
            }
        } else {
            tpl = ctx.url + fileType;
        }

        tpl = path.join(config.template.page || '', tpl);

        let p = path.join(__root, config.template.mock || '', (pageFile || ctx.url) + '.json');

        // page template  mock data
        let data;
        try {
            data = await fs.readFileAsync(p, 'utf-8');
        } catch (err) {}

        // global template mock data
        let gData;
        try{
            gData = await fs.readFileAsync(gp, 'utf-8');
        } catch (err) {}

        let json;
        try{
            if(data) {
                json = JSON.parse(data);
            }
        } catch(err) {

        }

        // combine with global data
        try{
            if(gData) {
                json = Object.assign(JSON.parse(gData), json);
            }
        } catch(err) {

        }

        // stringify property in json according to json.__json
        if(json && json.__json && json.__json.length) {
            json.__json.forEach(function(item, i){
                let key = Object.keys(item)[0];
                if(typeof json[key] === 'object') {
                    json[item[key]] = JSON.stringify(json[key]);
                }
            })
        }

        // render template end return html
        try {
            let html = await engine.render(tpl, json || {});
            ctx.body = html;
        } catch(err) {
            // console.error('[KS] render error');
            return next();
        }
    };
};

/**
 * remove postfix from the path, '/mock/demo.ftl' => '/mock/demo'
 * @param  {string} path path string
 * @return {string}      path without postfix
 */
function removePostfix(path) {
    if(typeof path !== 'string') {
        return;
    }
    var p = path.split('.');
    p.splice(p.length-1,1);
    return p.join('.');
}

/**
 * get path by url in the config.pages
 * @param  {string} url matching url
 * @return {string/number}     path, -1: not found
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

module.exports = tplEngine ;