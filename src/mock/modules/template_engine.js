
'use strict';

const path = require('path');
const fs = require('../../promise/fs');
const _ = require('../../util/extend');
const __root = fozy.__root;
const config = require(path.join(__root, 'fozy.config'));

const qs = require('querystring');
const requireNew = require('../../util/require_from_new.js');
const JSONProcessor = require('./json.processor.js');

const globalJsonPath = path.join(__root, config.template.mock, '__global/data.json');

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
        let files = getFiles(ctx, fileType);

        if(!files.isTplExist) {
            return next();
        }

        // template mock data
        let data, gData, json;
        try {
            // page mock data
            data = await fs.readFileAsync(files.json, 'utf-8');
            // string -> json
            json = JSON.parse(data);
            // global template mock data
            if(fs.existsSync(globalJsonPath)) {
                gData = await fs.readFileAsync(globalJsonPath, 'utf-8');
            }
            // combine with global data
            json = Object.assign(JSON.parse(gData), json);
        } catch (err) {
            console.info('[KS] mock data parse error, there may be something wrong with your .json files');
        }

        // process mock data with external js or stringify the specific object
        let proc = new JSONProcessor({
            module: files.js,
            preStringify: true,
        });

        json = proc.process(
            json || {},
            ctx.request.body,
            qs.parse(ctx.url.split('?')[1]),
            ctx,
        );

        // render template end return html
        try {
            let html = await engine.render(files.tpl, json || {});
            ctx.body = html;
        } catch(err) {
            console.error('[KS] render error, please check your template files and json files');
        }
    };
};

// get the template mock data file path according to the config.pages
function getFiles(ctx, fileType) {
    let files = {
        isTplExist: false,
    };

    if(config.pages && config.pages.length > 0) {
        files.tpl = getPathByUrl(_.removeQueryString(ctx.url));
        files.path = _.removePostfix(files.tpl);
        if(files.tpl === -1) {
            return files;
        }
    } else {
        files.tpl = ctx.url + fileType;
    }

    files.json = path.join(__root, config.template.mock || '', (files.path || ctx.url) + '.json');
    files.js = path.join(__root, config.template.mock || '', (files.path || ctx.url) + '.js');
    files.tpl = path.join(config.template.page || '', files.tpl);
    files.isTplExist = fs.existsSync(path.join(__root, config.template.root || '', files.tpl));
    return files;
}

/**
 * get path by url in the config.pages
 * @param  {string} url matching url
 * @return {string/number}     path, -1: not found
 */
function getPathByUrl(url) {
    var res = -1;
    _.which(config.pages, item => {
        if(item.url === url) {
            res = item.path;
            return true;
        }
    });
    return res;
}

module.exports = tplEngine ;